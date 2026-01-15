import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Card } from '../components';
import { Theme } from '../theme';

export const ProfileScreen: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [emailUpdates, setEmailUpdates] = React.useState(false);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.avatarLarge}>
          <Text style={styles.avatarTextLarge}>JD</Text>
        </View>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.nickname}>@johndoe</Text>
        <Text style={styles.location}>🇺🇸 United States</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <Card style={styles.menuCard} variant="elevated">
          <MenuItem icon="👤" title="Personal Information" />
          <MenuDivider />
          <MenuItem icon="🔐" title="Privacy & Security" />
          <MenuDivider />
          <MenuItem icon="📧" title="Email Address" subtitle="john@example.com" />
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <Card style={styles.menuCard} variant="elevated">
          <MenuItemWithSwitch
            icon="🔔"
            title="Push Notifications"
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
          />
          <MenuDivider />
          <MenuItemWithSwitch
            icon="📬"
            title="Email Updates"
            value={emailUpdates}
            onValueChange={setEmailUpdates}
          />
          <MenuDivider />
          <MenuItem icon="🌍" title="Language" subtitle="English" />
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <Card style={styles.menuCard} variant="elevated">
          <MenuItem icon="❓" title="Help Center" />
          <MenuDivider />
          <MenuItem icon="📄" title="Terms & Privacy" />
          <MenuDivider />
          <MenuItem icon="ℹ️" title="About" subtitle="Version 1.0.0" />
        </Card>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

interface MenuItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, title, subtitle, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Text style={styles.menuIcon}>{icon}</Text>
    <View style={styles.menuContent}>
      <Text style={styles.menuTitle}>{title}</Text>
      {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
    </View>
    <Text style={styles.menuArrow}>›</Text>
  </TouchableOpacity>
);

interface MenuItemWithSwitchProps {
  icon: string;
  title: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const MenuItemWithSwitch: React.FC<MenuItemWithSwitchProps> = ({
  icon,
  title,
  value,
  onValueChange,
}) => (
  <View style={styles.menuItem}>
    <Text style={styles.menuIcon}>{icon}</Text>
    <View style={styles.menuContent}>
      <Text style={styles.menuTitle}>{title}</Text>
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{
        false: Theme.colors.neutral[300],
        true: Theme.colors.primary[300],
      }}
      thumbColor={value ? Theme.colors.primary[500] : Theme.colors.neutral[100]}
    />
  </View>
);

const MenuDivider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background.lightSecondary,
  },
  header: {
    alignItems: 'center',
    paddingVertical: Theme.spacing.xl,
    backgroundColor: Theme.colors.background.light,
    marginBottom: Theme.spacing.md,
  },
  avatarLarge: {
    width: 96,
    height: 96,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Theme.spacing.md,
  },
  avatarTextLarge: {
    fontSize: Theme.typography.fontSize['3xl'],
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.text.light,
  },
  name: {
    fontSize: Theme.typography.fontSize['2xl'],
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.text.primary,
  },
  nickname: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.text.secondary,
    marginTop: 4,
  },
  location: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.text.tertiary,
    marginTop: Theme.spacing.xs,
  },
  editButton: {
    marginTop: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.sm,
    backgroundColor: Theme.colors.primary[500],
    borderRadius: Theme.borderRadius.full,
  },
  editButtonText: {
    fontSize: Theme.typography.fontSize.sm,
    fontWeight: Theme.typography.fontWeight.semibold,
    color: Theme.colors.text.light,
  },
  section: {
    paddingHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.semibold,
    color: Theme.colors.text.secondary,
    marginBottom: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.xs,
  },
  menuCard: {
    padding: 0,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.md,
  },
  menuIcon: {
    fontSize: 24,
    marginRight: Theme.spacing.md,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.medium,
    color: Theme.colors.text.primary,
  },
  menuSubtitle: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.text.secondary,
    marginTop: 2,
  },
  menuArrow: {
    fontSize: 24,
    color: Theme.colors.text.tertiary,
  },
  divider: {
    height: 1,
    backgroundColor: Theme.colors.border.light,
    marginLeft: 56,
  },
  logoutButton: {
    padding: Theme.spacing.md,
    backgroundColor: Theme.colors.background.light,
    borderRadius: Theme.borderRadius.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.status.error,
  },
  logoutText: {
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.semibold,
    color: Theme.colors.status.error,
  },
});

export default ProfileScreen;
