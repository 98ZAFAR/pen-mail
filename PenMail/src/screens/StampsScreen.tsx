import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Theme } from '../theme';

const { width } = Dimensions.get('window');
const STAMP_SIZE = (width - Theme.spacing.md * 3) / 2;

export const StampsScreen: React.FC = () => {
  // Mock data
  const stamps = [
    {
      id: '1',
      name: 'Vintage Rose',
      rarity: 'Rare',
      color: Theme.colors.secondary[400],
      collected: true,
    },
    {
      id: '2',
      name: 'Ocean Blue',
      rarity: 'Common',
      color: Theme.colors.accent[400],
      collected: true,
    },
    {
      id: '3',
      name: 'Golden Sunset',
      rarity: 'Epic',
      color: '#FCD34D',
      collected: true,
    },
    {
      id: '4',
      name: 'Moonlight',
      rarity: 'Rare',
      color: Theme.colors.primary[400],
      collected: false,
    },
    {
      id: '5',
      name: 'Cherry Blossom',
      rarity: 'Legendary',
      color: '#FCA5A5',
      collected: false,
    },
    {
      id: '6',
      name: 'Emerald Forest',
      rarity: 'Common',
      color: '#34D399',
      collected: true,
    },
  ];

  const collectedCount = stamps.filter(s => s.collected).length;

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common':
        return Theme.colors.neutral[500];
      case 'Rare':
        return Theme.colors.accent[500];
      case 'Epic':
        return Theme.colors.secondary[500];
      case 'Legendary':
        return '#F59E0B';
      default:
        return Theme.colors.neutral[500];
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.collectionCard}>
          <Text style={styles.collectionTitle}>My Collection</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(collectedCount / stamps.length) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {collectedCount} / {stamps.length}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.grid}>
        {stamps.map((stamp) => (
          <TouchableOpacity
            key={stamp.id}
            style={[
              styles.stampCard,
              !stamp.collected && styles.lockedStamp,
            ]}
            activeOpacity={0.8}>
            <View
              style={[
                styles.stampImage,
                { backgroundColor: stamp.collected ? stamp.color : Theme.colors.neutral[200] },
              ]}>
              {!stamp.collected && (
                <View style={styles.lockOverlay}>
                  <Text style={styles.lockIcon}>🔒</Text>
                </View>
              )}
            </View>
            <Text
              style={[
                styles.stampName,
                !stamp.collected && styles.lockedText,
              ]}
              numberOfLines={1}>
              {stamp.name}
            </Text>
            <View style={styles.rarityBadge}>
              <View
                style={[
                  styles.rarityDot,
                  { backgroundColor: getRarityColor(stamp.rarity) },
                ]}
              />
              <Text
                style={[
                  styles.rarityText,
                  !stamp.collected && styles.lockedText,
                ]}>
                {stamp.rarity}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>How to collect stamps?</Text>
        <Text style={styles.infoText}>
          • Send letters to friends from different countries{'\n'}
          • Receive letters with special stamps{'\n'}
          • Complete daily challenges{'\n'}
          • Exchange with other collectors
        </Text>
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
    padding: Theme.spacing.md,
  },
  collectionCard: {
    backgroundColor: Theme.colors.primary[500],
    padding: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.lg,
    ...Theme.shadows.md,
  },
  collectionTitle: {
    fontSize: Theme.typography.fontSize.xl,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.text.light,
    marginBottom: Theme.spacing.md,
  },
  progressContainer: {
    gap: Theme.spacing.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: Theme.borderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Theme.colors.text.light,
    borderRadius: Theme.borderRadius.full,
  },
  progressText: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.text.light,
    fontWeight: Theme.typography.fontWeight.semibold,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: Theme.spacing.sm,
  },
  stampCard: {
    width: STAMP_SIZE,
    margin: Theme.spacing.xs,
    backgroundColor: Theme.colors.background.light,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
    ...Theme.shadows.sm,
  },
  lockedStamp: {
    opacity: 0.6,
  },
  stampImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: Theme.borderRadius.md,
    marginBottom: Theme.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: Theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockIcon: {
    fontSize: 32,
  },
  stampName: {
    fontSize: Theme.typography.fontSize.sm,
    fontWeight: Theme.typography.fontWeight.semibold,
    color: Theme.colors.text.primary,
    marginBottom: 4,
  },
  rarityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rarityDot: {
    width: 6,
    height: 6,
    borderRadius: Theme.borderRadius.full,
  },
  rarityText: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.text.secondary,
  },
  lockedText: {
    opacity: 0.5,
  },
  infoSection: {
    margin: Theme.spacing.md,
    padding: Theme.spacing.lg,
    backgroundColor: Theme.colors.background.light,
    borderRadius: Theme.borderRadius.lg,
    ...Theme.shadows.sm,
  },
  infoTitle: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.sm,
  },
  infoText: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.text.secondary,
    lineHeight: 22,
  },
});

export default StampsScreen;
