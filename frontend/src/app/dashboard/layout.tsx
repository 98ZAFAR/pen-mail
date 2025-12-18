'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import { logoutUser } from '@/utils';

const dashboardLinks = [
  { label: 'Dashboard', href: '/dashboard', active: true },
  { label: 'Inbox', href: '/dashboard/inbox', active: false },
  { label: 'Outbox', href: '/dashboard/outbox', active: false },
  { label: 'Drafts', href: '/dashboard/drafts', active: false },
  { label: 'Friends', href: '/dashboard/friends', active: false },
  { label: 'Discover', href: '/dashboard/discover', active: false },
  { label: 'Profile', href: '/dashboard/profile', active: false },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleLogout = () => {
    // TODO: Implement logout
    const res = logoutUser();
    console.log('Logout: ', res);
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
      <Sidebar
        links={dashboardLinks}
        user={{ name: 'User', avatar: '' }}
        onLogout={handleLogout}
      />
      <main className="flex-1 ml-64">
        {children}
      </main>
    </div>
  );
}
