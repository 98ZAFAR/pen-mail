'use client';

import React from 'react';
import Header from '@/components/Header';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Link from 'next/link';

export default function DashboardPage() {
  // Mock data
  const stats = {
    inbox: 5,
    outbox: 12,
    friends: 8,
    stamps: 15,
  };

  return (
    <div>
      <Header
        title="Dashboard"
        subtitle="Welcome back to PenMail"
        actions={
          <Link href="/dashboard/compose">
            <Button variant="primary">✉️ Write Letter</Button>
          </Link>
        }
      />

      <div className="container py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Link href="/dashboard/inbox">
            <Card hoverable>
              <div className="text-center">
                <div className="text-4xl mb-2">📥</div>
                <h3 className="text-3xl font-bold mb-1" style={{ color: 'var(--color-primary)' }}>
                  {stats.inbox}
                </h3>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  Inbox
                </p>
              </div>
            </Card>
          </Link>

          <Link href="/dashboard/outbox">
            <Card hoverable>
              <div className="text-center">
                <div className="text-4xl mb-2">📤</div>
                <h3 className="text-3xl font-bold mb-1" style={{ color: 'var(--color-secondary)' }}>
                  {stats.outbox}
                </h3>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  Outbox
                </p>
              </div>
            </Card>
          </Link>

          <Link href="/dashboard/friends">
            <Card hoverable>
              <div className="text-center">
                <div className="text-4xl mb-2">👥</div>
                <h3 className="text-3xl font-bold mb-1" style={{ color: 'var(--color-info)' }}>
                  {stats.friends}
                </h3>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  Friends
                </p>
              </div>
            </Card>
          </Link>

          <Card hoverable>
            <div className="text-center">
              <div className="text-4xl mb-2">🏤</div>
              <h3 className="text-3xl font-bold mb-1" style={{ color: 'var(--color-accent)' }}>
                {stats.stamps}
              </h3>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                Stamps
              </p>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-foreground)' }}>
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/dashboard/compose">
              <Card hoverable>
                <div className="flex items-center gap-4">
                  <div className="text-3xl">✍️</div>
                  <div>
                    <h3 className="font-semibold text-lg">Write a Letter</h3>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      Compose a new letter
                    </p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/dashboard/discover">
              <Card hoverable>
                <div className="flex items-center gap-4">
                  <div className="text-3xl">🔍</div>
                  <div>
                    <h3 className="font-semibold text-lg">Discover People</h3>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      Find new pen pals
                    </p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/dashboard/profile">
              <Card hoverable>
                <div className="flex items-center gap-4">
                  <div className="text-3xl">⚙️</div>
                  <div>
                    <h3 className="font-semibold text-lg">Edit Profile</h3>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      Update your information
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-foreground)' }}>
            Recent Activity
          </h2>
          <Card>
            <div className="text-center py-8">
              <div className="text-5xl mb-4">📪</div>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                No recent activity. Start by writing a letter!
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
