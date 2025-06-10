import React from 'react';
import { render, screen } from '@testing-library/react';

import { EmptyState } from './';

describe('EmptyState component', () => {
  it('displays title, subtitle, icon and actions from props', () => {
    render(
      <EmptyState
        actions={<button type="button">Ok</button>}
        iconName="triangle-warning"
        iconVariant="warning"
        title="Empty state title"
        subtitle="Empty state subtitle"
      />,
    );

    expect(
      screen.getByRole('region', { name: 'Empty state title' }),
    ).toBeVisible();
    expect(screen.getByRole('region')).toHaveAccessibleDescription(
      'Empty state subtitle',
    );
    expect(
      screen.getByRole('heading', { name: 'Empty state title' }),
    ).toBeVisible();
    expect(screen.getByText('Empty state subtitle')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Ok' })).toBeVisible();
  });

  describe('given `illustration` props', () => {
    it('has an img component as children', () => {
      render(
        <EmptyState
          title="Empty state title"
          subtitle="Empty state subtitle"
          actions={[
            <button key="ok" type="button">
              Ok
            </button>,
          ]}
          illustration={<img src="img-url" alt="myImage" />}
        />,
      );

      expect(screen.getByRole('img', { name: 'myImage' })).toBeVisible();
    });
  });
});
