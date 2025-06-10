import React from 'react';
import { render, screen } from '@testing-library/react';

import { useDateFormatter, DATE_FORMAT } from '.';
import { GrapesProvider } from '../../components/GrapesProvider';
import { LOCALES } from '../../components/GrapesProvider/exampleLocales';

describe('useDateFormatter', () => {
  const date = new Date('2020-01-01');

  describe('given a date and a format', () => {
    // The DATE_FORMAT.LONG_WITH_TIME isn't tested because it's too flaky
    it.each([
      { format: DATE_FORMAT.SHORT, expected: '1/1/20' },
      { format: DATE_FORMAT.MEDIUM, expected: 'Jan 1, 2020' },
      {
        format: DATE_FORMAT.CUSTOM,
        options: { day: '2-digit' as const },
        expected: '01',
      },
    ])('returns $expected', ({ format, options, expected }) => {
      const Wrapper = () => {
        const dateFormatter = useDateFormatter();

        return <p>{dateFormatter(date, format, options)}</p>;
      };

      render(
        <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
          <Wrapper />
        </GrapesProvider>,
      );

      expect(screen.getByText(expected)).toBeVisible();
    });
  });

  describe('given a non date object', () => {
    it('returns an empty string', () => {
      const Wrapper = () => {
        const dateFormatter = useDateFormatter();

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return <h1>{dateFormatter(null)}</h1>;
      };

      render(
        <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
          <Wrapper />
        </GrapesProvider>,
      );

      expect(screen.getByRole('heading')).toBeEmptyDOMElement();
    });
  });
});
