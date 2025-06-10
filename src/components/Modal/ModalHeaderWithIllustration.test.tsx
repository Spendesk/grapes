import React from 'react';
import { render, screen } from '@testing-library/react';

import { ModalHeaderWithIllustration } from './';

describe('ModalHeaderWithIllustration component', () => {
  it('displays a title with an illustration and a subtitle', () => {
    render(
      <ModalHeaderWithIllustration
        illustration={<img alt="Hello" />}
        title="Modal title"
        subtitle="subtitle"
      />,
    );

    expect(screen.getByRole('heading', { name: 'Modal title' })).toBeVisible();
    expect(screen.getByRole('img', { name: 'Hello' })).toBeVisible();
    expect(screen.getByText('subtitle')).toBeVisible();
  });
});
