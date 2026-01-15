import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Card } from '../components';
import { Theme } from '../theme';

export const FriendsScreen: React.FC = () => {
  // Mock data
  const friends = [
    {
      id: '1',
      name: 'Sarah Johnson',
      nickname: '@sarahj',
      country: 'France',
      flag: '🇫🇷',
      mutualFriends: 3,
      lettersExchanged: 12,
    },
    {
      id: '2',
      name: 'Michael Chen',
      nickname: '@mikechen',
      country: 'Japan',
      flag: '🇯🇵',
      mutualFriends: 5,
      lettersExchanged: 8,
    },
    {
      id: '3',
      name: 'Emma Wilson',
      nickname: '@emmaw',
      country: 'Australia',
      flag: '🇦🇺',
      mutualFriends: 2,
      lettersExchanged: 15,
    },
  ];

  const pendingRequests = [
    {
      id: '4',
      name: 'Lucas Silva',
      nickname: '@lucass',
      country: 'Brazil',
      flag: '🇧🇷',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {pendingRequests.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pending Requests</Text>
          {pendingRequests.map((request) => (
            <Card key={request.id} style={styles.requestCard} variant="elevated">
              <View style={styles.friendHeader}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {request.name.split(' ').map(n => n[0]).join('')}
                  </Text>
                </View>
                <View style={styles.friendInfo}>
                  <Text style={styles.friendName}>{request.name}</Text>
                  <Text style={styles.friendNickname}>{request.nickname}</Text>
                  <Text style={styles.friendCountry}>
                    {request.flag} {request.country}
                  </Text>
                </View>
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity style={[styles.actionButton, styles.acceptButton]}>
                  <Text style={styles.acceptText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.declineButton]}>
                  <Text style={styles.declineText}>Decline</Text>
                </TouchableOpacity>
              </View>
            </Card>
          ))}
        </View>
      )}

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Friends ({friends.length})</Text>
          <TouchableOpacity>
            <Text style={styles.addButton}>+ Add</Text>
          </TouchableOpacity>
        </View>
        {friends.map((friend) => (
          <Card
            key={friend.id}
            style={styles.friendCard}
            onPress={() => console.log('View friend', friend.id)}
            variant="elevated">
            <View style={styles.friendHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {friend.name.split(' ').map(n => n[0]).join('')}
                </Text>
              </View>
              <View style={styles.friendInfo}>
                <Text style={styles.friendName}>{friend.name}</Text>
                <Text style={styles.friendNickname}>{friend.nickname}</Text>
                <Text style={styles.friendCountry}>
                  {friend.flag} {friend.country}
                </Text>
              </View>
            </View>
            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{friend.lettersExchanged}</Text>
                <Text style={styles.statLabel}>Letters</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.stat}>
                <Text style={styles.statValue}>{friend.mutualFriends}</Text>
                <Text style={styles.statLabel}>Mutual</Text>
              </View>
            </View>
          </Card>
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
  section: {
    padding: Theme.spacing.md,
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
  addButton: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.primary[500],
    fontWeight: Theme.typography.fontWeight.semibold,
  },
  friendCard: {
    marginBottom: Theme.spacing.md,
  },
  requestCard: {
    marginBottom: Theme.spacing.md,
  },
  friendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Theme.spacing.md,
  },
  avatarText: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.text.light,
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.semibold,
    color: Theme.colors.text.primary,
  },
  friendNickname: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.text.secondary,
    marginTop: 2,
  },
  friendCountry: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.text.tertiary,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: Theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border.light,
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: Theme.typography.fontSize.xl,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.primary[500],
  },
  statLabel: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.text.secondary,
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: Theme.colors.border.light,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
    marginTop: Theme.spacing.sm,
  },
  actionButton: {
    flex: 1,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: Theme.colors.primary[500],
  },
  acceptText: {
    color: Theme.colors.text.light,
    fontWeight: Theme.typography.fontWeight.semibold,
    fontSize: Theme.typography.fontSize.sm,
  },
  declineButton: {
    backgroundColor: Theme.colors.background.lightSecondary,
    borderWidth: 1,
    borderColor: Theme.colors.border.medium,
  },
  declineText: {
    color: Theme.colors.text.secondary,
    fontWeight: Theme.typography.fontWeight.semibold,
    fontSize: Theme.typography.fontSize.sm,
  },
});

export default FriendsScreen;
