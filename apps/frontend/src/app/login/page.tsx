'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input, Card, CardBody, Alert } from '@/components/ui';
import { useLogin } from '@/hooks/useApi';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loginError, setLoginError] = useState('');

  const loginMutation = useLogin();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!validateForm()) return;

    try {
      await loginMutation.mutateAsync({ email, password });
      router.push('/app/dashboard');
    } catch (error: any) {
      setLoginError(error.response?.data?.message || 'Failed to login. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 dark:from-secondary-900 dark:to-secondary-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-secondary-900 dark:text-white mb-2">PDFLeader</h1>
          <p className="text-secondary-600 dark:text-secondary-400">Pro</p>
        </div>

        <Card variant="elevated">
          <CardBody className="p-8">
            <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-2">Welcome back</h2>
            <p className="text-secondary-600 dark:text-secondary-400 mb-6">Sign in to your account to continue</p>

            {loginError && (
              <Alert type="error" message={loginError} className="mb-6" onClose={() => setLoginError('')} />
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                error={errors.email}
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: '' });
                }}
                error={errors.password}
              />

              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={loginMutation.isPending}
                className="w-full"
              >
                {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>

            <div className="mt-4">
              <Link href="/forgot-password" className="text-sm text-primary-500 hover:text-primary-600">
                Forgot your password?
              </Link>
            </div>

            <div className="mt-6 pt-6 border-t border-secondary-200 dark:border-secondary-700">
              <p className="text-center text-secondary-600 dark:text-secondary-400">
                Don't have an account?{' '}
                <Link href="/register" className="font-semibold text-primary-500 hover:text-primary-600">
                  Create one
                </Link>
              </p>
            </div>
          </CardBody>
        </Card>

        <p className="text-center text-xs text-secondary-500 dark:text-secondary-400 mt-8">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
