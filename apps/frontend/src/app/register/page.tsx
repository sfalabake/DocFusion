'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input, Card, CardBody, Alert, Textarea } from '@/components/ui';
import { useRegister } from '@/hooks/useApi';
import { validatePasswordStrength } from '@docfusion/shared';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [registerError, setRegisterError] = useState('');

  const registerMutation = useRegister();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const strength = validatePasswordStrength(formData.password);
      if (strength.score < 3) {
        newErrors.password = strength.feedback[0] || 'Password is too weak';
      }
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');

    if (!validateForm()) return;

    try {
      await registerMutation.mutateAsync({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      router.push('/app/dashboard');
    } catch (error: any) {
      setRegisterError(error.response?.data?.message || 'Failed to create account. Please try again.');
    }
  };

  const passwordStrength = validatePasswordStrength(formData.password);
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 dark:from-secondary-900 dark:to-secondary-950 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-secondary-900 dark:text-white mb-2">PDFLeader</h1>
          <p className="text-secondary-600 dark:text-secondary-400">Pro</p>
        </div>

        <Card variant="elevated">
          <CardBody className="p-8">
            <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-2">Create your account</h2>
            <p className="text-secondary-600 dark:text-secondary-400 mb-6">Join thousands of professionals</p>

            {registerError && (
              <Alert type="error" message={registerError} className="mb-6" onClose={() => setRegisterError('')} />
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  placeholder="John"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={errors.firstName}
                />

                <Input
                  label="Last Name"
                  placeholder="Doe"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                />
              </div>

              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />

              <div>
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                />
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-secondary-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${strengthColors[Math.max(0, Math.min(4, passwordStrength.score - 1))]}`}
                          style={{ width: `${(Math.min(5, passwordStrength.score) / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-secondary-600 dark:text-secondary-400">
                        {['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][passwordStrength.score]}
                      </span>
                    </div>
                    {passwordStrength.feedback.length > 0 && (
                      <ul className="text-xs text-secondary-600 dark:text-secondary-400 mt-2 space-y-1">
                        {passwordStrength.feedback.slice(0, 2).map((item, idx) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
              />

              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={registerMutation.isPending}
                className="w-full"
              >
                {registerMutation.isPending ? 'Creating account...' : 'Create account'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-secondary-200 dark:border-secondary-700">
              <p className="text-center text-secondary-600 dark:text-secondary-400 text-sm">
                Already have an account?{' '}
                <Link href="/login" className="font-semibold text-primary-500 hover:text-primary-600">
                  Sign in
                </Link>
              </p>
            </div>
          </CardBody>
        </Card>

        <p className="text-center text-xs text-secondary-500 dark:text-secondary-400 mt-8">
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
