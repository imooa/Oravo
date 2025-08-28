import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up - Oravo',
  description: 'Create your Oravo analytics account',
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {children}
    </div>
  );
}