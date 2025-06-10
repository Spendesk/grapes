import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CheckboxInput } from './';

describe('CheckboxInput component', () => {
  describe('given default props', () => {
    it('allows user to check or uncheck an input', async () => {
      const Wrapper = () => {
        const [isChecked, setChecked] = React.useState<boolean>(false);

        return (
          <CheckboxInput
            isChecked={isChecked}
            onChange={(e) => setChecked(e.currentTarget.checked)}
            aria-label="test"
          />
        );
      };

      render(<Wrapper />);

      expect(screen.getByRole('checkbox', { name: 'test' })).not.toBeChecked();

      await userEvent.click(screen.getByRole('checkbox'));
      expect(screen.getByRole('checkbox')).toBeChecked();

      await userEvent.click(screen.getByRole('checkbox'));
      expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('supports onClick listener', async () => {
      const handleOnClick = vi.fn();
      const handleOnChange = vi.fn();
      render(
        <CheckboxInput
          isChecked={false}
          onChange={handleOnChange}
          onClick={handleOnClick}
          aria-label="test"
        />,
      );

      await userEvent.click(screen.getByRole('checkbox', { name: 'test' }));
      expect(handleOnClick).toHaveBeenCalled();
      expect(handleOnChange).toHaveBeenCalled();
    });

    describe('given isDisabled props', () => {
      it('disables the checkbox', () => {
        render(
          <CheckboxInput
            isChecked={false}
            isDisabled
            onChange={vi.fn()}
            aria-label="test"
          />,
        );

        expect(
          screen.getByRole('checkbox', { name: 'test' }),
        ).not.toBeChecked();
        expect(screen.getByRole('checkbox', { name: 'test' })).toBeDisabled();
      });
    });

    describe('given isIndeterminate props', () => {
      it('sets the checkbox to inderminate state', () => {
        render(
          <CheckboxInput
            isChecked={false}
            isIndeterminate
            onChange={vi.fn()}
            aria-label="test"
          />,
        );

        expect(
          screen.getByRole('checkbox', { name: 'test' }),
        ).toBePartiallyChecked();
      });
    });
  });
});
