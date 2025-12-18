'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import LetterCard from '@/components/LetterCard';
import { Letter } from '@/types';
import { getOutbox } from '@/utils/letterApi';
import Button from '@/components/Button';
import Link from 'next/link';

export default function OutboxPage() {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadOutbox();
  }, []);

  const loadOutbox = async () => {
    setIsLoading(true);
    try {
      const response = await getOutbox();
      if (response.success && response.data) {
        setLetters(response.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load outbox');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLetterClick = (letterId: string) => {
    console.log('Open letter:', letterId);
    // TODO: Navigate to letter detail page
  };

  return (
    <div>
      <Header
        title="Outbox"
        subtitle="Letters you've sent"
        actions={
          <Link href="/dashboard/compose">
            <Button variant="primary">✉️ Write Letter</Button>
          </Link>
        }
      />

      <div className="container py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-current border-t-transparent rounded-full animate-spin" style={{ color: 'var(--color-primary)' }} />
            <p className="mt-4" style={{ color: 'var(--color-text-secondary)' }}>
              Loading letters...
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">⚠️</div>
            <p style={{ color: 'var(--color-error)' }}>{error}</p>
          </div>
        ) : letters.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">📪</div>
            <p className="mb-4" style={{ color: 'var(--color-text-secondary)' }}>
              You haven't sent any letters yet. Start writing!
            </p>
            <Link href="/dashboard/compose">
              <Button variant="primary">Write Your First Letter</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {letters.map((letter) => (
              <LetterCard
                key={letter._id}
                letter={letter}
                onClick={() => handleLetterClick(letter._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
