import { PasswordRule } from '../passwordRule';

export const passwordRules: PasswordRule[] = [
  {
    label: 'characters',
    required: 12,
    validate: (value): boolean => !!value && value.length >= 12,
  },
  {
    label: 'lowercase',
    required: 1,
    validate: (value): boolean => !!value && value.toUpperCase() !== value,
  },
  {
    label: 'uppercase',
    required: 1,
    validate: (value): boolean => !!value && value.toLowerCase() !== value,
  },
  {
    label: 'digit',
    required: 1,
    validate: (value): boolean => !!value && /\d/.test(value),
  },
];

export const getConfirmPasswordRule = (
  password: string | null,
): PasswordRule => {
  return {
    label: 'Passwords match',
    validate: (value) => Boolean(password && value && value === password),
  };
};
