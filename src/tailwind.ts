import plugin from 'tailwindcss/plugin';
import type { Config } from 'tailwindcss';

import { colors } from './colors';

export default {
  theme: {
    screens: {
      md: '632px',
      lg: '1000px',
    },
    fontSize: {
      12: 'var(--font-size-12)',
      14: 'var(--font-size-14)',
      16: 'var(--font-size-16)',
      20: 'var(--font-size-20)',
      24: 'var(--font-size-24)',
      32: 'var(--font-size-32)',
      40: 'var(--font-size-40)',
    },
    boxShadow: {
      xs: 'var(--elevation-xs)',
      s: 'var(--elevation-s)',
      m: 'var(--elevation-m)',
      l: 'var(--elevation-l)',
      xl: 'var(--elevation-xl)',
    },
    borderRadius: {
      4: 'var(--border-radius-4)',
      DEFAULT: 'var(--border-radius-4)',
      8: 'var(--border-radius-8)',
      12: 'var(--border-radius-12)',
      full: '9999px',
    },
    spacing: {
      '0': '0px',
      '4': 'var(--unit-4)',
      '8': 'var(--unit-8)',
      '12': 'var(--unit-12)',
      '16': 'var(--unit-16)',
      '20': 'var(--unit-20)',
      '24': 'var(--unit-24)',
      '32': 'var(--unit-32)',
      '40': 'var(--unit-40)',
      '48': 'var(--unit-48)',
      '56': 'var(--unit-56)',
      '64': 'var(--unit-64)',
    },
    maxWidth: {
      md: 'var(--unit-container-md)',
      lg: 'var(--unit-container-lg)',
    },
    textColor: {
      primary: colors.contentPrimary,
      'secondary-bg-primary': colors.contentSecondaryBgPrimary,
      'secondary-bg-secondary': colors.contentSecondaryBgSecondary,
      'decorative-icon': colors.contentDecorativeIcon,
      complementary: colors.contentComplementary,
      selected: colors.contentSelected,
      disabled: colors.contentDisabled,
      'brand-default': colors.contentBrandDefault,
      'brand-hover': colors.contentBrandHover,
      'brand-pressed': colors.contentBrandPressed,
      'info-default': colors.contentInfoDefault,
      'success-default': colors.contentSuccessDefault,
      'warning-default': colors.contentWarningDefault,
      'alert-default': colors.contentAlertDefault,
    },
    fill: {
      primary: colors.contentPrimary,
      'secondary-bg-primary': colors.contentSecondaryBgPrimary,
      'secondary-bg-secondary': colors.contentSecondaryBgSecondary,
      'decorative-icon': colors.contentDecorativeIcon,
      complementary: colors.contentComplementary,
      selected: colors.contentSelected,
      disabled: colors.contentDisabled,
      'brand-default': colors.contentBrandDefault,
      'brand-hover': colors.contentBrandHover,
      'brand-pressed': colors.contentBrandPressed,
      'info-default': colors.contentInfoDefault,
      'success-default': colors.contentSuccessDefault,
      'warning-default': colors.contentWarningDefault,
      'alert-default': colors.contentAlertDefault,
    },
    backgroundColor: {
      'primary-default': colors.backgroundPrimaryDefault,
      'primary-hover': colors.backgroundPrimaryHover,
      'primary-pressed': colors.backgroundPrimaryPressed,
      'primary-selected': colors.backgroundPrimarySelected,
      'primary-disabled': colors.backgroundPrimaryDisabled,
      'primary-readonly': colors.backgroundPrimaryReadonly,
      'secondary-default': colors.backgroundSecondaryDefault,
      'secondary-default-hover': colors.backgroundSecondaryHover,
      'tertiary-default': colors.backgroundTertiaryDefault,
      'complementary-default': colors.backgroundComplementaryDefault,
      'complementary-hover': colors.backgroundComplementaryHover,
      'complementary-pressed': colors.backgroundComplementaryPressed,
      'complementary-disabled': colors.backgroundComplementaryDisabled,
      'primary-brand-default': colors.backgroundPrimaryBrandDefault,
      'primary-brand-hover': colors.backgroundPrimaryBrandHover,
      'primary-brand-pressed': colors.backgroundPrimaryBrandPressed,
      'primary-info-default': colors.backgroundPrimaryInfoDefault,
      'primary-info-hover': colors.backgroundPrimaryInfoHover,
      'primary-info-pressed': colors.backgroundPrimaryInfoPressed,
      'primary-success-default': colors.backgroundPrimarySuccessDefault,
      'primary-success-hover': colors.backgroundPrimarySuccessHover,
      'primary-success-pressed': colors.backgroundPrimarySuccessPressed,
      'primary-warning-default': colors.backgroundPrimaryWarningDefault,
      'primary-warning-hover': colors.backgroundPrimaryWarningHover,
      'primary-warning-pressed': colors.backgroundPrimaryWarningPressed,
      'primary-alert-default': colors.backgroundPrimaryAlertDefault,
      'primary-alert-hover': colors.backgroundPrimaryAlertHover,
      'primary-alert-pressed': colors.backgroundPrimaryAlertPressed,
      'secondary-brand-default': colors.backgroundSecondaryBrandDefault,
      'secondary-brand-hover': colors.backgroundSecondaryBrandHover,
      'secondary-brand-pressed': colors.backgroundSecondaryBrandPressed,
      'secondary-info-default': colors.backgroundSecondaryInfoDefault,
      'secondary-info-hover': colors.backgroundSecondaryInfoHover,
      'secondary-info-pressed': colors.backgroundSecondaryInfoPressed,
      'secondary-success-default': colors.backgroundSecondarySuccessDefault,
      'secondary-success-hover': colors.backgroundSecondarySuccessHover,
      'secondary-success-pressed': colors.backgroundSecondarySuccessPressed,
      'secondary-warning-default': colors.backgroundSecondaryWarningDefault,
      'secondary-warning-hover': colors.backgroundSecondaryWarningHover,
      'secondary-warning-pressed': colors.backgroundSecondaryWarningPressed,
      'secondary-alert-default': colors.backgroundSecondaryAlertDefault,
      'secondary-alert-hover': colors.backgroundSecondaryAlertHover,
      'secondary-alert-pressed': colors.backgroundSecondaryAlertPressed,
      backdrop: colors.backgroundBackdrop,
    },
    borderColor: {
      default: colors.borderDefault,
      hover: colors.borderHover,
      selected: colors.borderSelected,
      complementary: colors.borderComplementary,
      info: colors.borderInfo,
      success: colors.borderSuccess,
      warning: colors.borderWarning,
      alert: colors.borderAlert,
    },
    // Below this are specific theme keys for Grapes (these keys do not exist in the standard tailwind config, but are used in the plugins afterward, cf. later in this file)
    body: {
      s: 's',
      m: 'm',
      l: 'l',
      xl: 'xl',
      xxl: 'xxl',
    },
    title: {
      s: 's',
      m: 'm',
      l: 'l',
      xl: 'xl',
      xxl: 'xxl',
    },
    heading: {
      m: 'm',
      l: 'l',
      xl: 'xl',
      xxl: 'xxl',
    },
  },
  variants: {
    title: ['responsive'],
    body: ['responsive'],
  },
  plugins: [
    plugin(({ addUtilities, theme }) => {
      const values = theme('title');

      if (values === undefined) {
        throw new Error('Unable to find title theme');
      }
      const baseSelectors = Object.entries(values).reduce(
        (acc, [key, value]) => {
          acc[`.title-${key}`] = {
            font: `var(--title-${value})`,
          };
          return acc;
        },
        {} as Record<string, Record<string, string>>,
      );

      addUtilities(baseSelectors);
    }),
    plugin(({ addUtilities, theme }) => {
      const values = theme('body');
      if (values === undefined) {
        throw new Error('Unable to find body theme');
      }

      const baseSelectors = Object.entries(values).reduce(
        (acc, [key, value]) => {
          acc[`.body-${key}`] = {
            font: `var(--body-${value})`,
          };
          return acc;
        },
        {} as Record<string, Record<string, string>>,
      );

      addUtilities(baseSelectors);
    }),
    plugin(({ addUtilities, theme }) => {
      const values = theme('heading');
      if (values === undefined) {
        throw new Error('Unable to find heading theme');
      }

      const baseSelectors = Object.entries(values).reduce(
        (acc, [key, value]) => {
          acc[`.heading-${key}`] = {
            font: `var(--heading-${value})`,
          };
          return acc;
        },
        {} as Record<string, Record<string, string>>,
      );

      addUtilities(baseSelectors);
    }),
    plugin(({ addUtilities, theme }) => {
      const values = theme('boxShadow');
      if (values === undefined) {
        throw new Error('Unable to find boxShadow theme');
      }

      const baseSelectors = Object.entries(values).reduce(
        (acc, [key, value]) => {
          acc[`.elevation-${key}`] = {
            boxShadow: value,
          };
          return acc;
        },
        {} as Record<string, { boxShadow: string }>,
      );

      addUtilities(baseSelectors);
    }),
    plugin(({ addComponents }) => {
      const box = {
        '.box': {
          border: `1px solid var(--color-border-default)`,
          backgroundColor: 'var(--color-background-primary-default)',
          borderRadius: 'var(--border-radius-12)',
          padding: 'var(--unit-24)',
        },
      };

      const separator = {
        '.separator': {
          width: '100%',
          borderBottom: `1px solid var(--color-border-default)`,
        },
      };

      addComponents(box);
      addComponents(separator);
    }),
  ],
} satisfies Partial<Config>;
