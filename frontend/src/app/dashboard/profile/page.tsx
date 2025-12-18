'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Card from '@/components/Card';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    nickName: 'johndoe',
    email: 'john@example.com',
    countryCode: 'US',
    languages: ['en'],
    interests: ['reading', 'travel'],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Implement profile update API call
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
    }, 1000);
  };

  return (
    <div>
      <Header
        title="Profile"
        subtitle="Manage your account information"
        actions={
          !isEditing ? (
            <Button variant="primary" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          ) : null
        }
      />

      <div className="container py-8 max-w-3xl">
        <Card>
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center mb-4">
              <span className="text-4xl font-bold text-white">
                {formData.fullName.charAt(0)}
              </span>
            </div>
            <h2 className="text-2xl font-bold">{formData.fullName}</h2>
            <p className="text-base" style={{ color: 'var(--color-text-muted)' }}>
              @{formData.nickName}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                disabled={!isEditing}
              />

              <Input
                label="Nickname"
                name="nickName"
                value={formData.nickName}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
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
                disabled={!isEditing}
                className="w-full px-3 py-2 text-base rounded-lg border-2 transition-all disabled:opacity-50"
                style={{
                  backgroundColor: 'var(--color-background)',
                  color: 'var(--color-foreground)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
                <option value="AU">Australia</option>
                <option value="IN">India</option>
              </select>
            </div>

            <div className="pt-4 border-t-2" style={{ borderColor: 'var(--color-border)' }}>
              <h3 className="text-lg font-semibold mb-4">Statistics</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                    12
                  </p>
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    Letters Sent
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold" style={{ color: 'var(--color-secondary)' }}>
                    8
                  </p>
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    Friends
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>
                    15
                  </p>
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    Stamps
                  </p>
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-4">
                <Button type="submit" isLoading={isLoading} className="flex-1">
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
}
