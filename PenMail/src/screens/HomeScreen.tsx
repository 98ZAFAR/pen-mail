import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LetterCard, Button } from '../components';
import { Theme } from '../theme';

export const HomeScreen: React.FC = () => {
  // Mock data - replace with actual data from API
  const recentLetters = [
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
      sender: 'Michael Chen',
      subject: 'Thank you!',
      preview: 'Your last letter really made my day. I appreciate your kind words...',
      date: '1 day ago',
      status: 'read' as const,
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning ☀️</Text>
          <Text style={styles.username}>John Doe</Text>
        </View>
        <TouchableOpacity style={styles.avatar}>
          <Text style={styles.avatarText}>JD</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Letters Sent</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>8</Text>
          <Text style={styles.statLabel}>Received</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>25</Text>
          <Text style={styles.statLabel}>Stamps</Text>
        </View>
      </View>

      <View style={styles.quickActions}>
        <Button
          title="✉️ Write Letter"
          onPress={() => console.log('Write letter')}
          variant="primary"
          fullWidth
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Letters</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        {recentLetters.map((letter) => (
          <LetterCard
            key={letter.id}
            sender={letter.sender}
            subject={letter.subject}
            preview={letter.preview}
            date={letter.date}
            status={letter.status}
            onPress={() => console.log('Open letter', letter.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background.lightSecondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.lg,
  },
  greeting: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.text.secondary,
  },
  username: {
    fontSize: Theme.typography.fontSize['2xl'],
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.text.primary,
    marginTop: 4,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.text.light,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
    gap: Theme.spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: Theme.colors.background.light,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    alignItems: 'center',
    ...Theme.shadows.sm,
  },
  statNumber: {
    fontSize: Theme.typography.fontSize['2xl'],
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.primary[500],
  },
  statLabel: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.text.secondary,
    marginTop: 4,
  },
  quickActions: {
    paddingHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
  },
  section: {
    paddingHorizontal: Theme.spacing.md,
    paddingBottom: Theme.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  sectionTitle: {
    fontSize: Theme.typography.fontSize.xl,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.text.primary,
  },
  seeAll: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.primary[500],
    fontWeight: Theme.typography.fontWeight.semibold,
  },
});

export default HomeScreen;
