'use client';

import React, { useState } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/utils/authApi';

const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
  { code: 'IN', name: 'India' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'BR', name: 'Brazil' },
  { code: 'JP', name: 'Japan' },
  { code: 'CN', name: 'China' },
  { code: 'RU', name: 'Russia' },
];

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    nickName: '',
    email: '',
    password: '',
    confirmPassword: '',
    countryCode: 'US',
  });
  const [errors, setErrors] = useState({
    fullName: '',
    nickName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setApiError('');
  };

  const validate = () => {
    const newErrors = {
      fullName: '',
      nickName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
    let isValid = true;

    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }

    if (!formData.nickName) {
      newErrors.nickName = 'Nickname is required';
      isValid = false;
    } else if (!/^[a-zA-Z0-9_]{3,20}$/.test(formData.nickName)) {
      newErrors.nickName = 'Nickname must be 3-20 characters (letters, numbers, underscore)';
      isValid = false;
    }

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
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      const { confirmPassword, ...registerData } = formData;
      const response = await registerUser(registerData);
      if (response.success) {
        router.push('/dashboard');
      } else {
        setApiError(response.message);
      }
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'Registration failed');
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
            Create your account
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
              placeholder="Enter your full name"
            />

            <Input
              label="Nickname"
              type="text"
              name="nickName"
              value={formData.nickName}
              onChange={handleChange}
              error={errors.nickName}
              placeholder="Choose a unique nickname"
              helperText="3-20 characters (letters, numbers, underscore)"
            />

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

            <div className="w-full">
              <label
                htmlFor="countryCode"
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--color-foreground)' }}
              >
                Country
              </label>
              <select
                id="countryCode"
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="w-full px-3 py-2 text-base rounded-lg border-2 transition-all"
                style={{
                  backgroundColor: 'var(--color-background)',
                  color: 'var(--color-foreground)',
                  borderColor: 'var(--color-border)',
                }}
              >
                {COUNTRIES.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="Create a password"
              autoComplete="new-password"
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              placeholder="Confirm your password"
              autoComplete="new-password"
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
              Register
            </Button>
          </form>
        </Card>

        <div className="text-center mt-6">
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Already have an account?{' '}
            <Link
              href="/auth/login"
              className="font-semibold"
              style={{ color: 'var(--color-primary)' }}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
