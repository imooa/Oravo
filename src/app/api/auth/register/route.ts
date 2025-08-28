import { z } from 'zod';
import { hashPassword } from '@/lib/auth';
import { ROLES } from '@/lib/constants';
import { uuid } from '@/lib/crypto';
import { parseRequest } from '@/lib/request';
import { json, badRequest, methodNotAllowed } from '@/lib/response';
import { createUser, getUserByUsername } from '@/queries';

export async function POST(request: Request) {
  // Check if public registration is enabled
  const registrationEnabled = process.env.DISABLE_REGISTRATION !== 'true';
  
  if (!registrationEnabled) {
    return json({ error: 'Public registration is disabled', registrationEnabled: false }, { status: 403 });
  }

  // Handle both JSON and form data
  let body: any;
  const contentType = request.headers.get('content-type') || '';
  
  try {
    if (contentType.includes('application/json')) {
      body = await request.json();
    } else {
      const formData = await request.formData();
      body = {
        username: formData.get('username'),
        password: formData.get('password'),
        email: formData.get('email'),
      };
    }
  } catch (err) {
    return badRequest('Invalid request format');
  }

  const schema = z.object({
    username: z.string().min(3).max(255),
    password: z.string().min(8).max(255),
    email: z.string().email().optional(),
  });

  const validation = schema.safeParse(body);
  
  if (!validation.success) {
    return badRequest(`Validation error: ${validation.error.errors.map(e => e.message).join(', ')}`);
  }

  const { username, password, email } = validation.data;

  // Check if user already exists
  const existingUser = await getUserByUsername(username, { showDeleted: true });

  if (existingUser) {
    return badRequest('Username already exists');
  }

  try {
    // Create new user with default 'user' role
    const user = await createUser({
      id: uuid(),
      username,
      password: hashPassword(password),
      role: ROLES.user,
    });

    // Return user data without password
    return json({
      id: user.id,
      username: user.username,
      role: user.role,
      createdAt: user.createdAt,
      message: 'User registered successfully',
    });
  } catch (error) {
    console.error('Registration error:', error);
    return badRequest('Failed to create user');
  }
}