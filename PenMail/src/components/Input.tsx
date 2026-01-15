import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import { Theme } from '../theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  variant?: 'outlined' | 'filled';
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  rightIcon,
  containerStyle,
  variant = 'outlined',
  style,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          styles[variant],
          isFocused && styles.focused,
          error && styles.error,
        ]}>
        {icon && <View style={styles.leftIcon}>{icon}</View>}
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={Theme.colors.text.tertiary}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.md,
  },
  label: {
    fontSize: Theme.typography.fontSize.sm,
    fontWeight: Theme.typography.fontWeight.medium,
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Theme.borderRadius.md,
    minHeight: 50,
  },
  outlined: {
    borderWidth: 1.5,
    borderColor: Theme.colors.border.light,
    backgroundColor: Theme.colors.background.light,
  },
  filled: {
    backgroundColor: Theme.colors.background.lightSecondary,
  },
  focused: {
    borderColor: Theme.colors.primary[500],
  },
  error: {
    borderColor: Theme.colors.status.error,
  },
  input: {
    flex: 1,
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.text.primary,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
  },
  leftIcon: {
    marginLeft: Theme.spacing.md,
  },
  rightIcon: {
    marginRight: Theme.spacing.md,
  },
  errorText: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.status.error,
    marginTop: Theme.spacing.xs,
    marginLeft: Theme.spacing.xs,
  },
});

export default Input;
