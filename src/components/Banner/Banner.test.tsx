import React from 'react';

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Banner } from './';
import { Button } from '../Button';

describe('Banner component', () => {
  it('displays a title and a description', () => {
    const randomDescription = 'Sunt quia cum aliquid vitae.';
    render(
      <Banner
        title="Hello world"
        illustration={<img src="" alt="nothing" />}
        actions={
          <Button
            variant="secondaryNeutral"
            onClick={vi.fn()}
            text="Say Hello"
          />
        }
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

  it('calls onClick when user click on actions', async () => {
    const handleClick1 = vi.fn();
    const handleClick2 = vi.fn();
    render(
      <Banner
        title="Hello world"
        illustration={<img src="" alt="nothing" />}
        actions={
          <>
            <Button
              variant="secondaryNeutral"
              onClick={handleClick1}
              text="Say Hello"
            />
            <Button
              variant="tertiaryNeutral"
              onClick={handleClick2}
              text="Say Goodbye"
            />
          </>
        }
      >
        Sunt quia cum aliquid vitae.
      </Banner>,
    );

    expect(handleClick1).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole('button', { name: 'Say Hello' }));
    expect(handleClick1).toHaveBeenCalled();
    expect(handleClick2).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole('button', { name: 'Say Goodbye' }));
    expect(handleClick2).toHaveBeenCalled();
  });
});
