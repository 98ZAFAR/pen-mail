'use client';

import React from 'react';
import Card from './Card';
import { Letter } from '@/types';

interface LetterCardProps {
  letter: Letter;
  onClick?: () => void;
}

export default function LetterCard({ letter, onClick }: LetterCardProps) {
  const otherUser = letter.sender._id === letter.sender._id ? letter.recipient : letter.sender;
  const isReceived = letter.status === 'received' || letter.status === 'read';

  const statusColor = {
    draft: 'var(--color-text-muted)',
    sent: 'var(--color-info)',
    received: 'var(--color-warning)',
    read: 'var(--color-success)',
    archived: 'var(--color-text-muted)',
  };

  return (
    <Card hoverable onClick={onClick}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-lg line-clamp-1">
              {isReceived ? `From: ${otherUser.fullName}` : `To: ${otherUser.fullName}`}
            </h3>
            {letter.stampId && <span className="text-xl">🏤</span>}
          </div>
          <p className="text-base font-medium mb-1">{letter.subject}</p>
          <p
            className="text-sm line-clamp-2"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {letter.body}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <span
          className="text-xs font-semibold px-2 py-1 rounded-full"
          style={{
            backgroundColor: statusColor[letter.status],
            color: 'white',
            opacity: 0.7,
          }}
        >
          {letter.status.toUpperCase()}
        </span>
        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          {new Date(letter.createdAt).toLocaleDateString()}
        </span>
      </div>
    </Card>
  );
}
