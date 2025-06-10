import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  DeprecatedModalSlideshow,
  type DeprecatedModalSlideshowSlide,
} from './';
import { LOCALES } from '../GrapesProvider/exampleLocales';
import { GrapesProvider } from '../GrapesProvider';

const slides: DeprecatedModalSlideshowSlide[] = [
  {
    title: 'Slide title 1',
    illustration: <img src="https://via.placeholder.com/500x400" alt="" />,
    content: 'Slide content 1',
  },
  {
    title: 'Slide title 2',
    illustration: <img src="https://via.placeholder.com/300x200" alt="" />,
    content: 'Slide content 2',
  },
  {
    title: 'Slide title 3',
    illustration: <img src="https://via.placeholder.com/100x500" alt="" />,
    content: 'Slide content 3',
  },
];

describe('DeprecatedModalSlideshow component', () => {
  it('allows the user to move from a slide to another', async () => {
    render(
      <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
        <DeprecatedModalSlideshow
          noAnimation
          isOpen
          slides={slides}
          translations={{
            cancel: 'Cancel',
            previous: 'Back',
            next: 'Next',
            done: 'Done',
          }}
          onCancel={vi.fn()}
          onDone={vi.fn()}
          onClose={vi.fn()}
        />
      </GrapesProvider>,
    );

    expect(screen.getByRole('dialog', { name: 'carousel' })).toBeVisible();

    // Slide 1
    expect(screen.getByRole('group', { name: 'Slide title 1' })).toBeVisible();
    expect(
      screen.queryByRole('group', { name: 'Slide title 2' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('group', { name: 'Slide title 3' }),
    ).not.toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Cancel/ })).toBeVisible();
    await userEvent.click(screen.getByRole('button', { name: /Next/ }));

    // Slide 2
    expect(
      await screen.findByRole('group', { name: 'Slide title 2' }),
    ).toBeVisible();
    expect(screen.getByRole('button', { name: /Back/ })).toBeVisible();
    await userEvent.click(screen.getByRole('button', { name: /Next/ }));

    // Slide 3
    expect(
      await screen.findByRole('group', { name: 'Slide title 3' }),
    ).toBeVisible();
    expect(screen.getByRole('button', { name: /Done/ })).toBeVisible();
    await userEvent.click(screen.getByRole('button', { name: /Back/ }));

    // Slide 2, the return
    expect(
      await screen.findByRole('group', { name: 'Slide title 2' }),
    ).toBeVisible();
  });

  it('calls onDone and onCancel at proper time', async () => {
    const handleCancel = vi.fn();
    const handleDone = vi.fn();
    render(
      <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
        <DeprecatedModalSlideshow
          noAnimation
          isOpen
          slides={slides}
          translations={{
            cancel: 'Cancel',
            previous: 'Back',
            next: 'Next',
            done: 'Done',
          }}
          onCancel={handleCancel}
          onDone={handleDone}
          onClose={vi.fn()}
        />
      </GrapesProvider>,
    );

    // Slide 1
    expect(
      await screen.findByRole('group', { name: 'Slide title 1' }),
    ).toBeVisible();
    await userEvent.click(screen.getByRole('button', { name: /Cancel/ }));
    expect(handleCancel).toHaveBeenCalled();

    await userEvent.click(screen.getByRole('button', { name: /Next/ }));

    // Slide 2
    expect(
      await screen.findByRole('group', { name: 'Slide title 2' }),
    ).toBeVisible();
    await userEvent.click(screen.getByRole('button', { name: /Next/ }));

    // Slide 3
    expect(
      await screen.findByRole('group', { name: 'Slide title 3' }),
    ).toBeVisible();
    expect(handleDone).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole('button', { name: /Done/ }));
    expect(handleDone).toHaveBeenCalled();

    await userEvent.click(screen.getByRole('button', { name: /Back/ }));

    // To prevent warning "An update to null inside a test was not wrapped in act(...)"
    expect(
      await screen.findByRole('group', { name: 'Slide title 2' }),
    ).toBeVisible();
  });

  it('returns to the first slide after closing the modal', async () => {
    const Story = () => {
      const [isOpen, setIsOpen] = React.useState(false);
      return (
        <GrapesProvider locale="en-US" localesDefinition={LOCALES}>
          <button type="button" onClick={() => setIsOpen(true)}>
            Open
          </button>
          <DeprecatedModalSlideshow
            noAnimation
            isOpen={isOpen}
            slides={slides}
            translations={{
              cancel: 'Cancel',
              previous: 'Back',
              next: 'Next',
              done: 'Done',
            }}
            onCancel={() => setIsOpen(false)}
            onDone={() => {
              setIsOpen(false);
            }}
            onClose={() => setIsOpen(false)}
          />
        </GrapesProvider>
      );
    };
    render(<Story />);

    await userEvent.click(screen.getByText('Open'));

    // Slide 1
    expect(
      await screen.findByRole('group', { name: 'Slide title 1' }),
    ).toBeVisible();
    await userEvent.click(screen.getByRole('button', { name: /Next/ }));

    // Slide 2
    expect(
      await screen.findByRole('group', { name: 'Slide title 2' }),
    ).toBeVisible();

    await userEvent.click(screen.getByRole('button', { name: /close/i }));
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    );

    await userEvent.click(screen.getByText('Open'));
    expect(
      await screen.findByRole('group', { name: 'Slide title 1' }),
    ).toBeVisible();
  });
});
