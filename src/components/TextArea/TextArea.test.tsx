import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TextArea } from './';

describe('TextArea component', () => {
  const value = 'abc';
  const onChange = vi.fn();

  describe('given an `id` props', () => {
    it('adds the `id` from props textarea component', () => {
      render(<TextArea id="my-input" value={value} onChange={onChange} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('id', 'my-input');
    });
  });

  describe('given a `isDisabled` props', () => {
    it('adds the `isDisabled` from props to the textarea component', () => {
      render(<TextArea isDisabled value={value} onChange={onChange} />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });
  });

  describe('given a `name` props', () => {
    it('adds the `name` from props to the textarea component', () => {
      render(<TextArea name="first-name" value={value} onChange={onChange} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('name', 'first-name');
    });
  });

  describe('given a `placeholder` props', () => {
    it('adds the `placeholder` from props to the textarea component', () => {
      render(
        <TextArea
          placeholder="Write something"
          value={value}
          onChange={onChange}
        />,
      );
      expect(screen.getByPlaceholderText('Write something')).toBeVisible();
    });
  });

  describe('given accessibility props', () => {
    it('can be accessible using aria-label', () => {
      render(
        <TextArea aria-label="myLabel" value={value} onChange={onChange} />,
      );
      expect(screen.getByRole('textbox', { name: 'myLabel' })).toBeVisible();
    });

    it('can be accessible using aria-labelledby', () => {
      render(
        <div>
          <p id="ref">myLabel</p>
          <TextArea aria-labelledby="ref" value={value} onChange={onChange} />,
        </div>,
      );
      expect(screen.getByRole('textbox', { name: 'myLabel' })).toBeVisible();
    });
  });

  describe('Given event handler', () => {
    /**
     * Grapes returns a Synthetic Event and not the textarea value. If we mock an event handler function,
     * Vitest will read the event, preventing us from reading it again to make assertion.
     * The solution is to not make an assertion about how event handler are called but how
     * the component works with other.
     */
    it('calls onChange and onKeyDown when user types', async () => {
      const Wrapper = () => {
        const [text, setText] = React.useState('');
        return (
          <TextArea
            value={text}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setText(e.target.value)
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
              if (e.shiftKey) {
                setText('shift');
              }
            }}
          />
        );
      };
      render(<Wrapper />);

      const textInput = screen.getByRole('textbox');
      await userEvent.type(textInput, 'myname');
      expect(textInput).toHaveValue('myname');

      await userEvent.type(textInput, '{shift}');
      expect(textInput).toHaveValue('shift');
    });

    it('calls onFocus and onBlur depending on user focus', async () => {
      const handleFocus = vi.fn();
      const handleBlur = vi.fn();
      render(
        <TextArea
          value=""
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={vi.fn()}
        />,
      );

      const textInput = screen.getByRole('textbox');
      expect(textInput).not.toHaveFocus();
      expect(handleFocus).toHaveBeenCalledTimes(0);

      await userEvent.tab(); // focus input
      expect(textInput).toHaveFocus();
      expect(handleFocus).toHaveBeenCalledTimes(1);
      expect(handleBlur).toHaveBeenCalledTimes(0);

      await userEvent.tab(); // unfocus input
      expect(textInput).not.toHaveFocus();
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('given a `isInvalid` props', () => {
    it('invalidates the textarea when set to `true`', () => {
      render(
        <div>
          <TextArea
            isInvalid
            value="abc"
            onChange={vi.fn()}
            aria-errormessage="1"
          />
          <p id="1">Invalid description</p>
        </div>,
      );
      expect(screen.getByRole('textbox')).toBeInvalid();
      expect(screen.getByRole('textbox')).toHaveAccessibleErrorMessage(
        'Invalid description',
      );
    });
  });
});
