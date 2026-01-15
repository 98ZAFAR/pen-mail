import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LetterCard } from '../components';
import { Theme } from '../theme';

type FilterType = 'all' | 'sent' | 'received' | 'draft';

export const LettersScreen: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // Mock data - replace with actual data from API
  const letters = [
    {
      id: '1',
      sender: 'Sarah Johnson',
      subject: 'Greetings from Paris!',
      preview: 'I hope this letter finds you well. I wanted to share my amazing experience...',
      date: '2 hours ago',
      status: 'received' as const,
    },
    {
      id: '2',
      sender: 'You',
      subject: 'Happy Birthday!',
      preview: 'Wishing you all the best on your special day...',
      date: '1 day ago',
      status: 'sent' as const,
    },
    {
      id: '3',
      sender: 'You',
      subject: 'Untitled',
      preview: 'This is a draft letter that I need to finish...',
      date: '2 days ago',
      status: 'draft' as const,
    },
  ];

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'received', label: 'Received' },
    { key: 'sent', label: 'Sent' },
    { key: 'draft', label: 'Drafts' },
  ];

  const filteredLetters = activeFilter === 'all' 
    ? letters 
    : letters.filter(l => l.status === activeFilter);

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterChip,
                activeFilter === filter.key && styles.activeFilterChip,
              ]}
              onPress={() => setActiveFilter(filter.key)}>
              <Text
                style={[
                  styles.filterText,
                  activeFilter === filter.key && styles.activeFilterText,
                ]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.lettersList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.lettersContent}>
        {filteredLetters.length > 0 ? (
          filteredLetters.map((letter) => (
            <LetterCard
              key={letter.id}
              sender={letter.sender}
              subject={letter.subject}
              preview={letter.preview}
              date={letter.date}
              status={letter.status}
              onPress={() => console.log('Open letter', letter.id)}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyTitle}>No letters yet</Text>
            <Text style={styles.emptyText}>
              Start writing your first letter to connect with someone special
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background.lightSecondary,
  },
  filterContainer: {
    backgroundColor: Theme.colors.background.light,
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border.light,
  },
  filterScroll: {
    paddingHorizontal: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
  filterChip: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.background.lightSecondary,
    borderWidth: 1,
    borderColor: Theme.colors.border.light,
  },
  activeFilterChip: {
    backgroundColor: Theme.colors.primary[500],
    borderColor: Theme.colors.primary[500],
  },
  filterText: {
    fontSize: Theme.typography.fontSize.sm,
    fontWeight: Theme.typography.fontWeight.medium,
    color: Theme.colors.text.secondary,
  },
  activeFilterText: {
    color: Theme.colors.text.light,
  },
  lettersList: {
    flex: 1,
  },
  lettersContent: {
    padding: Theme.spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.xxxl,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: Theme.spacing.md,
  },
  emptyTitle: {
    fontSize: Theme.typography.fontSize.xl,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.sm,
  },
  emptyText: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.text.secondary,
    textAlign: 'center',
    paddingHorizontal: Theme.spacing.xl,
  },
});

export default LettersScreen;
