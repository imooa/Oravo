import { z } from 'zod';
import { hashPassword } from '@/lib/auth';
import { ROLES } from '@/lib/constants';
import { uuid } from '@/lib/crypto';
import { parseRequest } from '@/lib/request';
import { json, badRequest, methodNotAllowed } from '@/lib/response';
import { createUser, getUserByUsername } from '@/queries';
import { createSecureToken } from '@/lib/jwt';
import { secret } from '@/lib/crypto';
import { saveAuth } from '@/lib/auth';
import redis from '@/lib/redis';

export async function POST(request: Request) {
  const schema = z.object({
    username: z.string().min(3).max(255),
    password: z.string().min(6),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

  const { body, error } = await parseRequest(request, schema, { skipAuth: true });

  if (error) {
    return error();
  }

  const { username, password } = body;

  // Check if user already exists
  const existingUser = await getUserByUsername(username, { showDeleted: true });

  if (existingUser) {
    return badRequest('Username already exists');
  }

  try {
    // Create new user
    const user = await createUser({
      id: uuid(),
      username,
      password: hashPassword(password),
      role: ROLES.user,
    });

    // Generate auth token
    let token: string;

    if (redis.enabled) {
      token = await saveAuth({ userId: user.id, role: user.role });
    } else {
      token = createSecureToken({ userId: user.id, role: user.role }, secret());
    }

    return json({
      token,
      user: { 
        id: user.id, 
        username: user.username, 
        role: user.role, 
        createdAt: new Date(),
        isAdmin: user.role === ROLES.admin 
      },
    });
  } catch (err) {
    console.error('Signup error:', err);
    return badRequest('Failed to create user');
  }
}

// Only allow POST method
export async function GET() {
  return methodNotAllowed();
}

export async function PUT() {
  return methodNotAllowed();
}

export async function DELETE() {
  return methodNotAllowed();
}