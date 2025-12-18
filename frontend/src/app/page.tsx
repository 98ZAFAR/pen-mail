import Link from 'next/link';
import Button from '@/components/Button';

export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <div className="max-w-4xl text-center">
        <div className="mb-8">
          <h1 className="text-6xl md:text-7xl font-bold mb-4" style={{ color: 'var(--color-primary)' }}>
            ✉️ PenMail
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4" style={{ color: 'var(--color-foreground)' }}>
            Connect Through Letters
          </h2>
          <p className="text-lg md:text-xl mb-8" style={{ color: 'var(--color-text-secondary)' }}>
            Send e-letters to your pen pals around the world. Collect stamps, make friends, and share stories.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/auth/register">
            <Button size="lg" variant="primary">
              Get Started
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button size="lg" variant="outline">
              Login
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div
            className="p-6 rounded-xl"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderLeft: '4px solid var(--color-primary)',
            }}
          >
            <div className="text-4xl mb-3">🌍</div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-foreground)' }}>
              Global Reach
            </h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Connect with pen pals from all around the world
            </p>
          </div>

          <div
            className="p-6 rounded-xl"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderLeft: '4px solid var(--color-secondary)',
            }}
          >
            <div className="text-4xl mb-3">🏤</div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-foreground)' }}>
              Collect Stamps
            </h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Earn unique stamps from different countries
            </p>
          </div>

          <div
            className="p-6 rounded-xl"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderLeft: '4px solid var(--color-accent)',
            }}
          >
            <div className="text-4xl mb-3">💌</div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-foreground)' }}>
              Write Letters
            </h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Share your stories and build meaningful connections
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
