import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Theme } from '../theme';

export interface TabItem {
  key: string;
  title: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
}

interface TabBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabPress: (key: string) => void;
}

export const TabBar: React.FC<TabBarProps> = ({ tabs, activeTab, onTabPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tab}
              onPress={() => onTabPress(tab.key)}
              activeOpacity={0.7}>
              <View style={styles.iconContainer}>
                {isActive ? (tab.activeIcon || tab.icon) : tab.icon}
              </View>
              <Text
                style={[
                  styles.tabLabel,
                  isActive && styles.activeTabLabel,
                ]}>
                {tab.title}
              </Text>
              {isActive && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.background.light,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border.light,
    ...Theme.shadows.lg,
  },
  tabBar: {
    flexDirection: 'row',
    paddingBottom: Platform.OS === 'ios' ? Theme.spacing.lg : Theme.spacing.sm,
    paddingTop: Theme.spacing.sm,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.xs,
    position: 'relative',
  },
  iconContainer: {
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.text.tertiary,
    fontWeight: Theme.typography.fontWeight.medium,
  },
  activeTabLabel: {
    color: Theme.colors.primary[500],
    fontWeight: Theme.typography.fontWeight.semibold,
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    width: 32,
    height: 3,
    backgroundColor: Theme.colors.primary[500],
    borderRadius: Theme.borderRadius.full,
  },
});

export default TabBar;
