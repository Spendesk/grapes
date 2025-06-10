import React from 'react';

import { render, screen } from '@testing-library/react';
import { CheckboxBox } from './';
import userEvent from '@testing-library/user-event';

describe('CheckboxBox component', () => {
  const label = 'Grapes with seeds ?';
  const description =
    'This is the optional and concise description of the Checkbox Box which helps to add some info and context to our users.';

  describe('given default props', () => {
    it('allows user to check or uncheck an input', async () => {
      const Wrapper = () => {
        const [isChecked, setChecked] = React.useState<boolean>(false);

        return (
          <CheckboxBox
            label={label}
            description={description}
            isChecked={isChecked}
            onChange={(e) => setChecked(e.currentTarget.checked)}
          />
        );
      };

      render(<Wrapper />);

      expect(screen.getByRole('checkbox', { name: label })).not.toBeChecked();
      expect(
        screen.getByRole('checkbox', { name: label }),
      ).toHaveAccessibleDescription(description);

      await userEvent.click(screen.getByRole('checkbox', { name: label }));

      expect(screen.getByRole('checkbox', { name: label })).toBeChecked();
    });

    describe('given isDisabled props', () => {
      it('disables the checkbox', () => {
        render(
          <CheckboxBox
            iconName="cross"
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
          <CheckboxBox
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
