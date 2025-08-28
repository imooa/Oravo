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
    return methodNotAllowed('Public registration is disabled');
  }

  const schema = z.object({
    username: z.string().min(3).max(255),
    password: z.string().min(8).max(255),
    email: z.string().email().optional(),
  });

  const { body, error } = await parseRequest(request, schema, { skipAuth: true });

  if (error) {
    return error();
  }

  const { username, password, email } = body;

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