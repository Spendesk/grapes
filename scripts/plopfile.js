const fs = require('node:fs');

function toFirstLetterUppercase(text) {
  return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
}

function toCamelCase(text) {
  if (text.includes('-')) {
    const splitText = text.split('-');
    return splitText.map((value) => toFirstLetterUppercase(value)).join('');
  }

  return toFirstLetterUppercase(text);
}

module.exports = (plop) => {
  plop.setGenerator('component', {
    description: 'add new component',
    prompts: [
      {
        type: 'input',
        name: 'componentName',
        message:
          'component name, please use appropriate uppercase (e.g. TextField)',
        validate: (answer) => answer.length > 0,
      },
      {
        type: 'list',
        name: 'categoryName',
        message: 'category of your component',
        choices: [
          'Interaction',
          'Form',
          'Feedback',
          'Navigation',
          'Data display',
          'Skeleton',
        ],
      },
    ],
    actions: ({ componentName }) => {
      const actions = [
        {
          type: 'addMany',
          templateFiles: '../plop-templates/component/**',
          base: '../plop-templates/component',
          destination: `../src/components/${componentName}`,
          data: { componentName },
        },
        {
          type: 'append',
          path: '../src/index.ts',
          pattern: /;$/m,
          template: `export { {{componentName}} } from './components/{{componentName}}';
export type { {{componentName}}Props } from './components/{{componentName}}';`,
        },
      ];

      return actions;
    },
  });
  plop.setGenerator('icon', {
    description: 'add new icon',
    prompts: [
      {
        type: 'input',
        name: 'iconName',
        message:
          'icon name, please use appropriate lowercase (e.g. person or plastic-card)',
        validate: (answer) => answer.length > 0,
      },
    ],
    actions: ({ iconName }) => {
      const collator = new Intl.Collator('en-US');
      const icons = fs
        .readdirSync('src/icons')
        .filter((name) => name !== 'index.ts');

      const nextIconInAlphabeticalOrder = icons.find(
        (icon) => collator.compare(icon, iconName) > 0,
      );
      let patternImport = new RegExp(`(\nexport const iconMap = {)`);
      let patternMap = new RegExp(`(};)`);

      if (nextIconInAlphabeticalOrder) {
        patternImport = new RegExp(
          `(.* from \'.\/${nextIconInAlphabeticalOrder}\';)`,
        );
        patternMap = new RegExp(
          `('?${nextIconInAlphabeticalOrder.replace('.tsx', '')}'?:.*)`,
        );
      }

      const actions = [
        {
          type: 'add',
          templateFile: '../plop-templates/icon/icon.tsx.hbs',
          path: `../src/icons/{{iconName}}.tsx`,
          data: { iconName, camelCaseIconName: toCamelCase(iconName) },
        },
        {
          type: 'modify',
          path: '../src/icons/index.ts',
          pattern: patternImport,
          template: `import { ${toCamelCase(iconName)}Icon } from './{{iconName}}.tsx'
$1`,
        },
        {
          type: 'modify',
          path: '../src/icons/index.ts',
          pattern: patternMap,
          template: `${!nextIconInAlphabeticalOrder ? '  ' : ''}'{{iconName}}': ${toCamelCase(iconName)}Icon,
${nextIconInAlphabeticalOrder ? '  $1' : '$1'}`,
        },
      ];

      return actions;
    },
  });
};
