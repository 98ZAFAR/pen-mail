import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Card } from './Card';
import { Theme } from '../theme';

interface LetterCardProps {
  sender: string;
  subject: string;
  preview: string;
  date: string;
  status: 'sent' | 'received' | 'read' | 'draft';
  stampColor?: string;
  onPress: () => void;
  style?: ViewStyle;
}

export const LetterCard: React.FC<LetterCardProps> = ({
  sender,
  subject,
  preview,
  date,
  status,
  stampColor = Theme.colors.secondary[500],
  onPress,
  style,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'sent':
        return Theme.colors.accent[500];
      case 'received':
        return Theme.colors.primary[500];
      case 'read':
        return Theme.colors.neutral[400];
      case 'draft':
        return Theme.colors.status.warning;
      default:
        return Theme.colors.neutral[400];
    }
  };

  return (
    <Card style={style ? { ...styles.card, ...style } : styles.card} onPress={onPress} variant="elevated">
      <View style={styles.header}>
        <View style={styles.senderInfo}>
          <Text style={styles.sender} numberOfLines={1}>
            {sender}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
            <Text style={styles.statusText}>{status}</Text>
          </View>
        </View>
        <View style={[styles.stamp, { backgroundColor: stampColor }]} />
      </View>
      <Text style={styles.subject} numberOfLines={1}>
        {subject}
      </Text>
      <Text style={styles.preview} numberOfLines={2}>
        {preview}
      </Text>
      <Text style={styles.date}>{date}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: Theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Theme.spacing.sm,
  },
  senderInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  sender: {
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.semibold,
    color: Theme.colors.text.primary,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: Theme.borderRadius.sm,
  },
  statusText: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.text.light,
    fontWeight: Theme.typography.fontWeight.medium,
    textTransform: 'capitalize',
  },
  stamp: {
    width: 40,
    height: 40,
    borderRadius: Theme.borderRadius.sm,
    marginLeft: Theme.spacing.sm,
  },
  subject: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.medium,
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.xs,
  },
  preview: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.text.secondary,
    lineHeight: 20,
    marginBottom: Theme.spacing.sm,
  },
  date: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.text.tertiary,
  },
});

export default LetterCard;
