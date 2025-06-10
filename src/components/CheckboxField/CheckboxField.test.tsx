import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CheckboxField } from './';

describe('CheckboxField component', () => {
  const label = 'Grapes with seeds ?';
  describe('given default props', () => {
    it('allows user to check or uncheck an input', async () => {
      const Wrapper = () => {
        const [isChecked, setChecked] = React.useState<boolean>(false);

        return (
          <CheckboxField
            label={label}
            isChecked={isChecked}
            onChange={(e) => setChecked(e.currentTarget.checked)}
          />
        );
      };

      render(<Wrapper />);

      expect(screen.getByRole('checkbox', { name: label })).not.toBeChecked();

      await userEvent.click(screen.getByRole('checkbox', { name: label }));

      expect(screen.getByRole('checkbox', { name: label })).toBeChecked();
    });

    describe('given isDisabled props', () => {
      it('disables the checkbox', () => {
        render(
          <CheckboxField
            label={label}
            isChecked={false}
            isDisabled
            onChange={vi.fn()}
          />,
        );

        expect(screen.getByRole('checkbox', { name: label })).not.toBeChecked();
        expect(screen.getByRole('checkbox', { name: label })).toBeDisabled();
      });
    });

    describe('given isIndeterminate props', () => {
      it('sets the checkbox to inderminate state', () => {
        render(
          <CheckboxField
            label={label}
            isChecked={false}
            isIndeterminate
            onChange={vi.fn()}
          />,
        );

        expect(
          screen.getByRole('checkbox', { name: label }),
        ).toBePartiallyChecked();
      });
    });
  });
});
