import { NextResponse } from 'next/server';

export async function GET() {
  const debug = {
    nodeEnv: process.env.NODE_ENV,
    cloudMode: process.env.CLOUD_MODE,
    cloudUrl: process.env.CLOUD_URL,
    disableRegistration: process.env.DISABLE_REGISTRATION,
    basePath: process.env.BASE_PATH,
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(debug);
}