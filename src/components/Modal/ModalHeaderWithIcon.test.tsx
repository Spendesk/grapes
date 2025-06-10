import React from 'react';
import { render, screen } from '@testing-library/react';

import { ModalHeaderWithIcon } from './';

describe('ModalHeaderWithIcon component', () => {
  it('displays a title and a subtitle', () => {
    render(
      <ModalHeaderWithIcon
        title="Modal title"
        iconName="plane"
        subtitle="subtitle"
      />,
    );

    expect(screen.getByRole('heading', { name: 'Modal title' })).toBeVisible();
    expect(screen.getByText('subtitle')).toBeVisible();
  });
});
