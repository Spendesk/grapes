import React from 'react';
import { screen, render } from '@testing-library/react';

import { AutocompleteNoOptions } from './';

describe('AutocompleteNoOptions component', () => {
  describe('given default props', () => {
    it('renders the component with the options', () => {
      render(
        <AutocompleteNoOptions>
          <div>There are no options</div>
        </AutocompleteNoOptions>,
      );
      expect(screen.getByText('There are no options')).toBeVisible();
    });

    it('renders the component with a text option', () => {
      render(
        <AutocompleteNoOptions>
          There are really no options
        </AutocompleteNoOptions>,
      );
      expect(screen.getByText('There are really no options')).toBeVisible();
    });
  });
});
