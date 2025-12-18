'use client';

import React from 'react';
import Card from './Card';
import { User } from '@/types';
import Button from './Button';

interface UserCardProps {
  user: User;
  onConnect?: () => void;
  onViewProfile?: () => void;
  isFriend?: boolean;
  isRequested?: boolean;
}

export default function UserCard({
  user,
  onConnect,
  onViewProfile,
  isFriend = false,
  isRequested = false,
}: UserCardProps) {
  return (
    <Card>
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center mb-3">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.fullName}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-2xl font-bold text-white">
              {user.fullName.charAt(0)}
            </span>
          )}
        </div>

        <h3 className="font-semibold text-lg">{user.fullName}</h3>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          @{user.nickName}
        </p>

        <div className="flex flex-wrap gap-1 justify-center mt-3 mb-3">
          {user.interests.slice(0, 3).map((interest) => (
            <span
              key={interest}
              className="text-xs px-2 py-1 rounded-full"
              style={{
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
              }}
            >
              {interest}
            </span>
          ))}
        </div>

        <div className="text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>
          {user.friends.length} friends • {user.collectedStamps.length} stamps
        </div>

        <div className="flex gap-2 w-full">
          <Button
            size="sm"
            variant="outline"
            onClick={onViewProfile}
            className="flex-1"
          >
            View
          </Button>
          {!isFriend && (
            <Button
              size="sm"
              variant="primary"
              onClick={onConnect}
              disabled={isRequested}
              className="flex-1"
            >
              {isRequested ? 'Pending' : 'Connect'}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
