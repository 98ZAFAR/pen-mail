'use client';

import React, { useState } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/utils/authApi';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setApiError('');
  };

  const validate = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setApiError('');

    try {
      const response = await loginUser(formData);
      if (response.success) {
        router.push('/dashboard');
      } else {
        setApiError(response.message);
      }
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--color-primary)' }}>
            ✉️ PenMail
          </h1>
          <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
            Welcome back! Login to continue
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="Enter your email"
              autoComplete="email"
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="Enter your password"
              autoComplete="current-password"
            />

            {apiError && (
              <div
                className="p-3 rounded-lg text-sm"
                style={{
                  backgroundColor: 'var(--color-accent-light)',
                  color: 'var(--color-error)',
                }}
              >
                {apiError}
              </div>
            )}

            <Button type="submit" isLoading={isLoading} className="w-full">
              Login
            </Button>

            <div className="text-center pt-4">
              <Link
                href="/auth/forgot-password"
                className="text-sm"
                style={{ color: 'var(--color-primary)' }}
              >
                Forgot Password?
              </Link>
            </div>
          </form>
        </Card>

        <div className="text-center mt-6">
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Don't have an account?{' '}
            <Link
              href="/auth/register"
              className="font-semibold"
              style={{ color: 'var(--color-primary)' }}
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
