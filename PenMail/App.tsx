/**
 * PenMail - Modern Pen Pal Application
 * Connect with people worldwide through letters
 *
 * @format
 */

import React, { useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TabBar, TabItem } from './src/components/TabBar';
import {
  HomeScreen,
  LettersScreen,
  FriendsScreen,
  StampsScreen,
  ProfileScreen,
} from './src/screens';
import {
  HomeIcon,
  LetterIcon,
  FriendsIcon,
  StampIcon,
  ProfileIcon,
} from './src/components/icons';
import { Theme } from './src/theme';
import { TopBar } from './src/components';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const tabs: TabItem[] = [
    {
      key: 'home',
      title: 'Home',
      icon: <HomeIcon size={24} color={Theme.colors.text.tertiary} />,
      activeIcon: <HomeIcon size={24} color={Theme.colors.primary[500]} filled />,
    },
    {
      key: 'letters',
      title: 'Letters',
      icon: <LetterIcon size={24} color={Theme.colors.text.tertiary} />,
      activeIcon: <LetterIcon size={24} color={Theme.colors.primary[500]} filled />,
    },
    {
      key: 'friends',
      title: 'Friends',
      icon: <FriendsIcon size={24} color={Theme.colors.text.tertiary} />,
      activeIcon: <FriendsIcon size={24} color={Theme.colors.primary[500]} filled />,
    },
    {
      key: 'stamps',
      title: 'Stamps',
      icon: <StampIcon size={24} color={Theme.colors.text.tertiary} />,
      activeIcon: <StampIcon size={24} color={Theme.colors.primary[500]} filled />,
    },
    {
      key: 'profile',
      title: 'Profile',
      icon: <ProfileIcon size={24} color={Theme.colors.text.tertiary} />,
      activeIcon: <ProfileIcon size={24} color={Theme.colors.primary[500]} filled />,
    },
  ];

  const getScreenTitle = () => {
    switch (activeTab) {
      case 'home':
        return 'PenMail';
      case 'letters':
        return 'My Letters';
      case 'friends':
        return 'Friends';
      case 'stamps':
        return 'Stamp Collection';
      case 'profile':
        return 'Profile';
      default:
        return 'PenMail';
    }
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'letters':
        return <LettersScreen />;
      case 'friends':
        return <FriendsScreen />;
      case 'stamps':
        return <StampsScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor={Theme.colors.background.light} />
      <View style={styles.container}>
        <TopBar
          title={getScreenTitle()}
          rightIcon={
            activeTab === 'home' ? (
              <View style={styles.notificationBadge}>
                <View style={styles.badge} />
              </View>
            ) : undefined
          }
          onRightPress={activeTab === 'home' ? () => console.log('Notifications') : undefined}
        />
        <View style={styles.content}>{renderScreen()}</View>
        <TabBar tabs={tabs} activeTab={activeTab} onTabPress={setActiveTab} />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background.light,
  },
  content: {
    flex: 1,
  },
  notificationBadge: {
    width: 24,
    height: 24,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Theme.colors.status.error,
  },
});

export default App;
