import { Metadata } from 'next';
import SignupForm from './SignupForm';

export const metadata: Metadata = {
  title: 'Sign Up - Oravo',
  description: 'Create your Oravo analytics account',
};

export default function SignupPage() {
  return <SignupForm />;
}