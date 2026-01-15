import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme } from '../theme';

interface TopBarProps {
  title: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  subtitle?: string;
  transparent?: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  subtitle,
  transparent = false,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top },
        transparent && styles.transparent,
      ]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={transparent ? 'transparent' : Theme.colors.background.light}
        translucent
      />
      <View style={styles.content}>
        <View style={styles.leftSection}>
          {leftIcon && onLeftPress ? (
            <TouchableOpacity
              onPress={onLeftPress}
              style={styles.iconButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              {leftIcon}
            </TouchableOpacity>
          ) : (
            <View style={styles.iconPlaceholder} />
          )}
        </View>

        <View style={styles.centerSection}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {subtitle && (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>

        <View style={styles.rightSection}>
          {rightIcon && onRightPress ? (
            <TouchableOpacity
              onPress={onRightPress}
              style={styles.iconButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              {rightIcon}
            </TouchableOpacity>
          ) : (
            <View style={styles.iconPlaceholder} />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.background.light,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border.light,
    ...Theme.shadows.sm,
  },
  transparent: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    shadowOpacity: 0,
    elevation: 0,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
    minHeight: 56,
  },
  leftSection: {
    width: 40,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Theme.spacing.sm,
  },
  rightSection: {
    width: 40,
    alignItems: 'flex-end',
  },
  iconButton: {
    padding: Theme.spacing.xs,
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.text.primary,
  },
  subtitle: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.text.secondary,
    marginTop: 2,
  },
});

export default TopBar;
