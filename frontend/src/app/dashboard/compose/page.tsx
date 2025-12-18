'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Card from '@/components/Card';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { sendLetter } from '@/utils/letterApi';

export default function ComposePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    recipientId: '',
    subject: '',
    body: '',
  });
  const [errors, setErrors] = useState({
    recipientId: '',
    subject: '',
    body: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setApiError('');
  };

  const validate = () => {
    const newErrors = {
      recipientId: '',
      subject: '',
      body: '',
    };
    let isValid = true;

    if (!formData.recipientId) {
      newErrors.recipientId = 'Recipient is required';
      isValid = false;
    }

    if (!formData.subject) {
      newErrors.subject = 'Subject is required';
      isValid = false;
    }

    if (!formData.body) {
      newErrors.body = 'Message body is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setApiError('');

    try {
      const response = await sendLetter(formData);
      if (response.success) {
        router.push('/dashboard/outbox');
      } else {
        setApiError(response.message);
      }
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'Failed to send letter');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveDraft = () => {
    console.log('Save draft');
    // TODO: Implement save as draft
  };

  return (
    <div>
      <Header
        title="Compose Letter"
        subtitle="Write a letter to your pen pal"
      />

      <div className="container py-8 max-w-4xl">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Recipient"
              name="recipientId"
              value={formData.recipientId}
              onChange={handleChange}
              error={errors.recipientId}
              placeholder="Enter recipient's nickname or ID"
              helperText="Enter the nickname of your friend"
            />

            <Input
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              error={errors.subject}
              placeholder="What's your letter about?"
            />

            <div className="w-full">
              <label
                htmlFor="body"
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--color-foreground)' }}
              >
                Message
              </label>
              <textarea
                id="body"
                name="body"
                value={formData.body}
                onChange={handleChange}
                rows={12}
                className="w-full px-3 py-2 text-base rounded-lg border-2 transition-all duration-200 focus:outline-none focus:shadow-lg resize-y"
                style={{
                  backgroundColor: 'var(--color-background)',
                  color: 'var(--color-foreground)',
                  borderColor: errors.body
                    ? 'var(--color-error)'
                    : 'var(--color-border)',
                }}
                placeholder="Write your letter here..."
              />
              {errors.body && (
                <p className="text-sm mt-1" style={{ color: 'var(--color-error)' }}>
                  {errors.body}
                </p>
              )}
            </div>

            {apiError && (
              <div
                className="p-3 rounded-lg text-sm"
                style={{
                  backgroundColor: 'var(--color-accent-light)',
                  color: 'var(--color-error)',
                }}
              >
                {apiError}
              </div>
            )}

            <div className="flex gap-4">
              <Button type="submit" isLoading={isLoading} className="flex-1">
                Send Letter ✉️
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleSaveDraft}
                className="flex-1"
              >
                Save Draft 📝
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
