'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import UserCard from '@/components/UserCard';
import Button from '@/components/Button';
import Link from 'next/link';
import { User } from '@/types';
import { getFriends } from '@/utils/userApi';

export default function FriendsPage() {
  const [friends, setFriends] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadFriends();
  }, []);

  const loadFriends = async () => {
    setIsLoading(true);
    try {
      const response = await getFriends();
      if (response.success && response.data) {
        setFriends(response.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load friends');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewProfile = (userId: string) => {
    console.log('View profile:', userId);
    // TODO: Navigate to user profile
  };

  return (
    <div>
      <Header
        title="Friends"
        subtitle="Your pen pal connections"
        actions={
          <Link href="/dashboard/discover">
            <Button variant="primary">🔍 Find Friends</Button>
          </Link>
        }
      />

      <div className="container py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-current border-t-transparent rounded-full animate-spin" style={{ color: 'var(--color-primary)' }} />
            <p className="mt-4" style={{ color: 'var(--color-text-secondary)' }}>
              Loading friends...
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">⚠️</div>
            <p style={{ color: 'var(--color-error)' }}>{error}</p>
          </div>
        ) : friends.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">👥</div>
            <p className="mb-4" style={{ color: 'var(--color-text-secondary)' }}>
              You don't have any friends yet. Start discovering pen pals!
            </p>
            <Link href="/dashboard/discover">
              <Button variant="primary">Discover People</Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {friends.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                isFriend={true}
                onViewProfile={() => handleViewProfile(user._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
