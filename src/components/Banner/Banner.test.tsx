import React from 'react';

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Banner } from './';

describe('Banner component', () => {
  it('displays a title and a description', () => {
    const randomDescription = 'Sunt quia cum aliquid vitae.';
    render(
      <Banner
        title="Hello world"
        onClick={vi.fn()}
        actionText="Say Hello"
        illustration={<img src="" alt="nothing" />}
      >
        {randomDescription}
      </Banner>,
    );

    const banner = screen.getByRole('complementary', {
      name: 'Hello world',
    });
    expect(banner).toBeVisible();
    expect(banner).toHaveTextContent(randomDescription);

    expect(
      within(banner).getByRole('button', { name: 'Say Hello' }),
    ).toBeVisible();
  });

  it('calls onClick when user click on the button', async () => {
    const handleClick = vi.fn();
    render(
      <Banner
        title="Hello world"
        onClick={handleClick}
        actionText="Say Hello"
        illustration={<img src="" alt="nothing" />}
      >
        Sunt quia cum aliquid vitae.
      </Banner>,
    );

    expect(handleClick).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole('button', { name: 'Say Hello' }));
    expect(handleClick).toHaveBeenCalled();
  });
});
