'use client';
import { useState } from 'react';
import { Form, FormInput, FormRow, FormButtons, TextField, Button, Icon, Text } from 'react-basics';
import { useRouter } from 'next/navigation';
import Logo from '@/assets/logo.svg';
import { useMessages } from '@/components/hooks';
import { HOMEPAGE_URL } from '@/lib/constants';
import styles from './SignupForm.module.css';

export function SignupForm() {
  const router = useRouter();
  const { formatMessage, labels } = useMessages();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
          email: data.email,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/login?message=registration-success');
        }, 2000);
      } else {
        setError(result.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = (value: string) => {
    if (value.length < 8) {
      return 'Password must be at least 8 characters';
    }
    return null;
  };

  if (success) {
    return (
      <div className={styles.signup}>
        <Icon className={styles.icon} size="xl">
          <Logo />
        </Icon>
        <div className={styles.title}>Oravo</div>
        <div className={styles.success}>
          <Text>Registration successful! Redirecting to login...</Text>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.signup}>
      <Icon className={styles.icon} size="xl">
        <Logo />
      </Icon>
      <div className={styles.title}>Oravo</div>
      <div className={styles.subtitle}>Create your account</div>
      <Form className={styles.form} onSubmit={handleSubmit} error={error}>
        <FormRow label="Username">
          <FormInput
            name="username"
            rules={{
              required: 'Username is required',
              minLength: { value: 3, message: 'Username must be at least 3 characters' },
            }}
          >
            <TextField autoComplete="username" />
          </FormInput>
        </FormRow>
        <FormRow label="Email (optional)">
          <FormInput
            name="email"
            rules={{
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            }}
          >
            <TextField autoComplete="email" />
          </FormInput>
        </FormRow>
        <FormRow label="Password">
          <FormInput
            name="password"
            rules={{
              required: 'Password is required',
              validate: validatePassword,
            }}
          >
            <TextField type="password" autoComplete="new-password" />
          </FormInput>
        </FormRow>
        <FormRow label="Confirm Password">
          <FormInput
            name="confirmPassword"
            rules={{
              required: 'Please confirm your password',
              validate: (value: string, formValues: any) =>
                value === formValues.password || 'Passwords do not match',
            }}
          >
            <TextField type="password" autoComplete="new-password" />
          </FormInput>
        </FormRow>
        <FormButtons>
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            style={{ width: '100%' }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </FormButtons>
      </Form>
      <div className={styles.links}>
        <Text>
          Already have an account?{' '}
          <a href="/login" className={styles.link}>
            Sign in
          </a>
        </Text>
      </div>
      <div className={styles.footer}>
        <a href={HOMEPAGE_URL} target="_blank" rel="noopener noreferrer">
          <Text size="sm">Powered by Oravo</Text>
        </a>
      </div>
    </div>
  );
}

export default SignupForm;