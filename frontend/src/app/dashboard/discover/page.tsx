'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import UserCard from '@/components/UserCard';
import { User } from '@/types';
import { getDiscoverUsers } from '@/utils/userApi';

export default function DiscoverPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const response = await getDiscoverUsers();
      if (response.success && response.data) {
        setUsers(response.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = (userId: string) => {
    console.log('Connect to user:', userId);
    // TODO: Implement connect friend request
  };

  const handleViewProfile = (userId: string) => {
    console.log('View profile:', userId);
    // TODO: Navigate to user profile
  };

  return (
    <div>
      <Header title="Discover" subtitle="Find new pen pals around the world" />

      <div className="container py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-current border-t-transparent rounded-full animate-spin" style={{ color: 'var(--color-primary)' }} />
            <p className="mt-4" style={{ color: 'var(--color-text-secondary)' }}>
              Finding pen pals...
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">⚠️</div>
            <p style={{ color: 'var(--color-error)' }}>{error}</p>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🔍</div>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              No users found. Check back later!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                onConnect={() => handleConnect(user._id)}
                onViewProfile={() => handleViewProfile(user._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
