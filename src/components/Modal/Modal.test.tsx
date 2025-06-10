import React, { useState } from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { GrapesContext } from '../GrapesProvider/GrapesContext';
import { Button } from '../Button';
import { LOCALES } from '../GrapesProvider/exampleLocales';
import { renderWithGrapesProvider } from '../../test-utils/renderers';

import { Modal } from './';

describe('Modal component', () => {
  it('displays a modal with a title, content and actions', () => {
    render(
      <Modal
        isOpen
        iconName="arrow-turn-right"
        iconVariant="info"
        title="Modal title"
        actions={[
          <button key="ok" type="button">
            Ok
          </button>,
        ]}
      >
        <p>Modal content</p>
      </Modal>,
    );

    expect(screen.getByRole('heading', { name: 'Modal title' })).toBeVisible();
    expect(screen.getByText('Modal content')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Ok' })).toBeVisible();
  });

  it('displays subtitle from props', () => {
    render(
      <Modal
        isOpen
        iconName="arrow-turn-right"
        iconVariant="info"
        title="Modal title"
        subtitle="Modal subtitle"
        actions={[
          <button key="ok" type="button">
            Ok
          </button>,
        ]}
      />,
    );

    expect(screen.getByText('Modal subtitle')).toBeVisible();
  });

  describe('accessibility', () => {
    it('adds proper aria attributes', () => {
      render(
        <Modal
          isOpen
          iconName="arrow-turn-right"
          iconVariant="info"
          title="Modal title"
          actions={[
            <button key="ok" type="button">
              Ok
            </button>,
          ]}
        >
          <p>Modal content</p>
        </Modal>,
      );

      const modal = screen.getByRole('dialog', { name: 'Modal title' });
      expect(modal).toBeVisible();
      expect(modal).toHaveAttribute('aria-modal', 'true');
    });
  });

  describe('given `illustration` props', () => {
    it('has an img component as children', () => {
      const { rerender } = render(
        <Modal
          isOpen
          title="Modal title"
          subtitle="Modal subtitle"
          actions={[
            <button key="ok" type="button">
              Ok
            </button>,
          ]}
          illustration={<img src="img-url" alt="myImage" />}
        />,
      );

      const illustration = screen.getByRole('img');
      expect(illustration).toBeVisible();
      expect(illustration.parentElement).toHaveStyle({ height: '424px' });

      // Add illustrationHeight props to the modal
      rerender(
        <Modal
          isOpen
          title="Modal title"
          subtitle="Modal subtitle"
          actions={[
            <button key="ok" type="button">
              Ok
            </button>,
          ]}
          illustration={<img src="img-url" alt="myImage" />}
          illustrationHeight="500px"
        />,
      );

      expect(illustration.parentElement).toHaveStyle({ height: '500px' });
    });
  });

  describe('given `onClose` props', () => {
    it('allows user to close the modal', async () => {
      const Story = () => {
        const [isOpen, setIsOpen] = React.useState(false);

        return (
          <>
            <button type="button" onClick={() => setIsOpen(true)}>
              Open
            </button>
            <Modal
              isOpen={isOpen}
              iconName="arrow-turn-right"
              iconVariant="info"
              title="Modal title"
              actions={[]}
              onClose={() => setIsOpen(false)}
            >
              <p>Modal content</p>
            </Modal>
          </>
        );
      };

      renderWithGrapesProvider(<Story />);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      await userEvent.click(screen.getByText('Open'));

      // Wait for modal to open
      expect(await screen.findByRole('dialog')).toBeVisible();

      // Click on close button
      await userEvent.click(
        within(screen.getByRole('dialog')).getByRole('button', {
          name: 'Close',
        }),
      );

      await waitForElementToBeRemoved(() => screen.getByRole('dialog'));
    });
  });

  describe('given a `className` props', () => {
    it('displays subtitle from props', () => {
      render(
        <Modal
          isOpen
          iconName="arrow-turn-right"
          iconVariant="info"
          title="Modal title"
          subtitle="Modal subtitle"
          className="MyModal"
          actions={[
            <button key="ok" type="button">
              Ok
            </button>,
          ]}
        />,
      );

      expect(screen.getByRole('dialog')).toHaveClass('MyModal');
    });
  });

  describe('handle focus trap', () => {
    it('should set inert to true when modal is open', () => {
      const setInert = vi.fn();
      render(
        <GrapesContext.Provider
          value={{ locale: 'en-us', localesDefinition: LOCALES, setInert }}
        >
          <Modal
            isOpen
            iconName="arrow-turn-right"
            iconVariant="info"
            title="Modal title"
            actions={[
              <button key="ok" type="button">
                Ok
              </button>,
            ]}
          >
            <p>Modal content</p>
          </Modal>
        </GrapesContext.Provider>,
      );

      expect(screen.getByText('Modal content')).toBeVisible();
      expect(setInert).toHaveBeenCalledWith(true);
    });

    it('should handle inert state on isOpen changes', async () => {
      const setInert = vi.fn();
      const GoodCodePractice = () => {
        const [open, setOpen] = useState(false);

        return (
          <GrapesContext.Provider
            value={{ locale: 'en-us', localesDefinition: LOCALES, setInert }}
          >
            <Modal
              isOpen={open}
              iconName="arrow-turn-right"
              iconVariant="info"
              title="Modal title"
              actions={[
                <button key="ok" type="button">
                  Ok
                </button>,
              ]}
            >
              <p>Modal content</p>
            </Modal>
            <Button
              variant="primaryBrand"
              onClick={() => setOpen((state) => !state)}
              text="Toggle"
            />
          </GrapesContext.Provider>
        );
      };

      render(<GoodCodePractice />);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(setInert).toHaveBeenLastCalledWith(false); // On mount, Modal call setInert

      await userEvent.click(screen.getByRole('button', { name: 'Toggle' }));

      expect(await screen.findByRole('dialog')).toBeVisible();
      expect(setInert).toHaveBeenLastCalledWith(true);

      await userEvent.click(screen.getByRole('button', { name: 'Toggle' }));
      expect(setInert).toHaveBeenLastCalledWith(false);
      await waitForElementToBeRemoved(() => screen.getByRole('dialog'));
    });

    it('should handle inert state even when developpers do not leverage isOpen props', async () => {
      const setInert = vi.fn();
      const BadCodePractice = () => {
        const [open, setOpen] = useState(false);

        return (
          <GrapesContext.Provider
            value={{ locale: 'en-us', localesDefinition: LOCALES, setInert }}
          >
            {open && (
              <Modal
                isOpen
                iconName="arrow-turn-right"
                iconVariant="info"
                title="Modal title"
                actions={[
                  <button key="ok" type="button">
                    Ok
                  </button>,
                ]}
              >
                <p>Modal content</p>
              </Modal>
            )}
            <Button
              variant="primaryBrand"
              onClick={() => setOpen((state) => !state)}
              text="Toggle"
            />
          </GrapesContext.Provider>
        );
      };

      render(<BadCodePractice />);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(setInert).not.toHaveBeenCalled();

      await userEvent.click(screen.getByRole('button', { name: 'Toggle' }));

      expect(await screen.findByRole('dialog')).toBeVisible();
      expect(setInert).toHaveBeenLastCalledWith(true);

      await userEvent.click(screen.getByRole('button', { name: 'Toggle' }));
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(setInert).toHaveBeenLastCalledWith(false);
    });
  });
});
