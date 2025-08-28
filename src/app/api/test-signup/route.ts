import { NextResponse } from 'next/server';

export async function GET() {
  const registrationEnabled = process.env.DISABLE_REGISTRATION !== 'true';
  
  return NextResponse.json({
    message: 'Signup test endpoint working',
    registrationEnabled,
    disableRegistration: process.env.DISABLE_REGISTRATION,
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
}

export async function POST() {
  const registrationEnabled = process.env.DISABLE_REGISTRATION !== 'true';
  
  if (!registrationEnabled) {
    return NextResponse.json(
      { error: 'Public registration is disabled' },
      { status: 403 }
    );
  }

  return NextResponse.json({
    message: 'Test signup endpoint - registration is enabled',
    timestamp: new Date().toISOString(),
  });
}