'use client';

import React from 'react';
import Link from 'next/link';

interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

interface SidebarProps {
  links: NavLink[];
  user?: { name: string; avatar?: string };
  onLogout?: () => void;
}

export default function Sidebar({ links, user, onLogout }: SidebarProps) {
  return (
    <aside
      className="fixed left-0 top-0 h-screen w-64 border-r-2 overflow-y-auto"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="p-6 border-b-2" style={{ borderColor: 'var(--color-border)' }}>
        <h2 className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
          ✉️ PenMail
        </h2>
      </div>

      <nav className="p-6">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`
                  block px-4 py-2 rounded-lg font-medium transition-all
                  ${link.active ? 'shadow-md' : 'hover:bg-border'}
                `}
                style={{
                  backgroundColor: link.active ? 'var(--color-primary)' : 'transparent',
                  color: link.active ? 'white' : 'var(--color-foreground)',
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {user && (
        <div
          className="absolute bottom-0 left-0 right-0 border-t-2 p-4"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <div className="flex items-center gap-3 mb-4">
            {user.avatar && (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
            )}
            <div>
              <p className="font-semibold text-sm">{user.name}</p>
            </div>
          </div>
          {onLogout && (
            <button
              onClick={onLogout}
              className="w-full px-3 py-2 rounded-lg font-medium text-sm transition-all hover:bg-error hover:text-white"
              style={{ color: 'var(--color-foreground)' }}
            >
              Logout
            </button>
          )}
        </div>
      )}
    </aside>
  );
}
