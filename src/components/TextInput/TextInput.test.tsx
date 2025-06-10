import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TextInput } from './';

describe('TextInput component', () => {
  const value = 'abc';
  const onChange = vi.fn();

  describe('given an `id` props', () => {
    it('adds the `id` from props Input component', () => {
      render(<TextInput id="my-input" value={value} onChange={onChange} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('id', 'my-input');
    });
  });

  describe('given a `isDisabled` props', () => {
    it('adds the `isDisabled` from props to the Input component', () => {
      render(<TextInput isDisabled value={value} onChange={onChange} />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });
  });

  describe('given a `name` props', () => {
    it('adds the `name` from props to the Input component', () => {
      render(<TextInput name="first-name" value={value} onChange={onChange} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('name', 'first-name');
    });
  });

  describe('given a `placeholder` props', () => {
    it('adds the `placeholder` from props to the Input component', () => {
      render(
        <TextInput
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
        <TextInput aria-label="myLabel" value={value} onChange={onChange} />,
      );
      expect(screen.getByRole('textbox', { name: 'myLabel' })).toBeVisible();
    });

    it('can be accessible using aria-labelledby', () => {
      render(
        <div>
          <p id="ref">myLabel</p>
          <TextInput aria-labelledby="ref" value={value} onChange={onChange} />,
        </div>,
      );
      expect(screen.getByRole('textbox', { name: 'myLabel' })).toBeVisible();
    });
  });

  describe('Given event handler', () => {
    /**
     * Grapes returns a Synthetic Event and not the input value. If we mock an event handler function,
     * Vitest will read the event, preventing us from reading it again to make assertion.
     * The solution is to not make an assertion about how event handler are called but how
     * the component works with other.
     */
    it('calls onChange and onKeyDown when user types', async () => {
      const Wrapper = () => {
        const [text, setText] = React.useState('');
        return (
          <TextInput
            value={text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setText(e.target.value)
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
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
        <TextInput
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

  describe('Given a ref', () => {
    it('foward the ref to the input (uncontrolled component)', async () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<TextInput ref={ref} defaultValue="hello" />);

      const textInput = screen.getByRole('textbox');
      await userEvent.type(textInput, 'world');

      expect(ref.current?.value).toBe('helloworld');
    });
  });
});
