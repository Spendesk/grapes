import React from 'react';
import { render, screen } from '@testing-library/react';

import { Box } from '.';

describe('Box.Container component', () => {
  it('should display the content of the component', () => {
    render(<Box>Hello</Box>);

    expect(screen.getByText('Hello')).toBeVisible();
  });

  it('should support role', () => {
    render(
      <Box role="region" aria-labelledby="titleId">
        <h2 id="titleId">Title</h2>
        <p>Hello</p>
      </Box>,
    );

    expect(screen.getByRole('region', { name: 'Title' })).toBeVisible();
  });
});
