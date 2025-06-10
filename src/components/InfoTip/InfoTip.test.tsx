import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { InfoTip } from './';

describe('InfoTip component', () => {
  it('displays content when user hover the Icon', () => {
    render(<InfoTip content="My tooltip" aria-label="Information" />);

    // Icon is replaced by IconComponent text in test
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    fireEvent.mouseEnter(screen.getByRole('img', { name: 'Information' }), {
      bubbles: true,
    });
    expect(screen.getByRole('tooltip', { name: 'My tooltip' })).toBeVisible();
    fireEvent.mouseLeave(screen.getByRole('img', { name: 'Information' }), {
      bubbles: true,
    });

    expect(
      screen.queryByRole('tooltip', { name: 'My tooltip' }),
    ).not.toBeInTheDocument();
  });
});
