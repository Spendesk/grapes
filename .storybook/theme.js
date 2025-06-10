import { create } from 'storybook/theming';

export default create({
  base: 'light',

  colorPrimary: '#e4ddff',
  colorSecondary: '#7136ed',

  // UI
  appBg: 'white',
  appContentBg: 'white',
  appBorderColor: '#e8e8e8',
  appBorderRadius: 4,

  // Typography
  fontBase: "'Inter', Helvetica, sans-serif",

  // Text colors
  textColor: '#191b1b',
  barTextColor: '#191b1b',
  barHoverColor: '#4f03ba',
  barSelectedColor: '#7136ed',
  barBg: '#f8f8f8',

  brandImage: 'images/logo.svg',
});
