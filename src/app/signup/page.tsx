import { Metadata } from 'next';
import SignupPage from './SignupPage';

export const metadata: Metadata = {
  title: 'Sign Up - Oravo Analytics',
  description: 'Create your Oravo Analytics account',
};

export default function Page() {
  return <SignupPage />;
}