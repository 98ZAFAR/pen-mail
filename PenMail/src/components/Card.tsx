import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { Theme } from '../theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  variant?: 'elevated' | 'outlined' | 'filled';
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  variant = 'elevated',
}) => {
  const cardStyle = [
    styles.base,
    styles[variant],
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyle}
        onPress={onPress}
        activeOpacity={0.8}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
  },
  elevated: {
    backgroundColor: Theme.colors.background.light,
    ...Theme.shadows.md,
  },
  outlined: {
    backgroundColor: Theme.colors.background.light,
    borderWidth: 1,
    borderColor: Theme.colors.border.light,
  },
  filled: {
    backgroundColor: Theme.colors.background.lightSecondary,
  },
});

export default Card;
