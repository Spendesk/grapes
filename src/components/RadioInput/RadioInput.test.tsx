import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RadioInput } from './';

describe('RadioInput component', () => {
  describe('given default props', () => {
    it('has an input of type radio as child', async () => {
      const onChange = vi.fn();
      render(
        <RadioInput value="my-value" isChecked={false} onChange={onChange} />,
      );

      expect(screen.getByRole('radio')).not.toBeChecked();
      await userEvent.click(screen.getByRole('radio'));
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('given `isChecked` props', () => {
    describe('when sets to `true`', () => {
      it('has a checked input as child', () => {
        render(<RadioInput value="my-value" isChecked onChange={vi.fn()} />);
        expect(screen.getByRole('radio')).toBeChecked();
      });
    });
  });

  describe('given a `isDisabled` props', () => {
    describe('when sets to `true`', () => {
      it('has a disabled input as child', () => {
        render(
          <RadioInput
            value="my-value"
            isChecked
            isDisabled
            onChange={vi.fn()}
          />,
        );

        expect(screen.getByRole('radio')).toBeDisabled();
      });
    });
  });
});
