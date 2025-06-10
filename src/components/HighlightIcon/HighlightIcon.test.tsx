import React from 'react';
import { render, screen } from '@testing-library/react';

import { HighlightIcon } from './';

describe('HighlightIcon component', () => {
  it('supports ARIA attributs', () => {
    render(
      <HighlightIcon
        variant="info"
        size={24}
        name="arrow-turn-right"
        aria-label="Congratulation"
      />,
    );

    expect(screen.getByRole('img', { name: 'Congratulation' })).toBeVisible();
  });
});
