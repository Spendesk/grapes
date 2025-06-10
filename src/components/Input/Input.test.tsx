import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Input } from './';

describe('Input component', () => {
  describe('given default props', () => {
    it('supports several listener', async () => {
      const value = 'abc';
      const onChange = vi.fn();
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const onKeyDown = vi.fn();
      render(
        <Input
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
        />,
      );

      expect(screen.getByRole('textbox')).toBeVisible();
      expect(screen.getByRole('textbox')).toHaveValue(value);

      expect(onChange).not.toHaveBeenCalled();
      expect(onFocus).not.toHaveBeenCalled();

      await userEvent.type(screen.getByRole('textbox'), 'def');
      expect(onFocus).toHaveBeenCalledTimes(1);

      // User typed 3 letters, so 3 times onChange and onKeyDown
      expect(onChange).toHaveBeenCalledTimes(3);
      expect(onKeyDown).toHaveBeenCalledTimes(3);

      // Unfocus input
      await userEvent.tab();
      expect(onBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('given HTML attributs', () => {
    it('sets them to the input', () => {
      const id = 'my-input';
      const name = 'my-input';
      const placeholder = 'Insert something here';
      render(
        <Input
          id={id}
          name={name}
          value="abc"
          placeholder={placeholder}
          onChange={vi.fn()}
        />,
      );

      expect(screen.getByRole('textbox')).toHaveAttribute('id', id);
      expect(screen.getByRole('textbox')).toHaveAttribute('name', name);
      expect(screen.getByRole('textbox')).toHaveAttribute(
        'placeholder',
        placeholder,
      );
    });
  });

  describe('given a `isDisabled` props', () => {
    it('disables the input when set to `true`', () => {
      render(<Input isDisabled value="abc" onChange={vi.fn()} />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });
  });

  describe('given a `isInvalid` props', () => {
    it('invalidates the input when set to `true`', () => {
      render(
        <div>
          <Input
            isInvalid
            value="abc"
            onChange={vi.fn()}
            aria-errormessage="1"
          />
          <p id="1">Invalid email</p>
        </div>,
      );
      expect(screen.getByRole('textbox')).toBeInvalid();
      expect(screen.getByRole('textbox')).toHaveAccessibleErrorMessage(
        'Invalid email',
      );
    });
  });

  describe('given a `isReadOnly` props', () => {
    it('prevents user to update the input but allows focus', async () => {
      const handleChange = vi.fn();
      const handleFocus = vi.fn();
      render(
        <Input
          isReadOnly
          value="abc"
          onChange={handleChange}
          onFocus={handleFocus}
        />,
      );

      expect(screen.getByRole('textbox')).toHaveAttribute('readonly', '');

      await userEvent.type(screen.getByRole('textbox'), 'update me');
      expect(handleChange).not.toHaveBeenCalled();
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });
  });

  describe('given a `maxLength` props', () => {
    it('prevents user to sets more characters than `maxLength`', async () => {
      const Wrapper = () => {
        const [value, setValue] = React.useState('');
        return (
          <Input
            maxLength={1}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        );
      };
      render(<Wrapper />);

      await userEvent.type(screen.getByRole('textbox'), 'abcd');
      expect(screen.getByRole('textbox')).toHaveValue('a');
    });
  });

  describe('given accessibility attributs', () => {
    it('supports aria-labelledby', () => {
      render(
        <>
          <p id="label">My label</p>
          <Input aria-labelledby="label" value="abc" onChange={vi.fn()} />
        </>,
      );
      expect(screen.getByRole('textbox', { name: 'My label' })).toBeVisible();
    });

    it('supports aria-label', () => {
      render(<Input aria-label="My label" value="abc" onChange={vi.fn()} />);
      expect(screen.getByRole('textbox', { name: 'My label' })).toBeVisible();
    });
  });

  describe('given a `maskOptions` props', () => {
    it('uses Cleave input to format value', () => {
      render(
        <Input value="4444333322221111" maskOptions={{ creditCard: true }} />,
      );

      expect(screen.getByRole('textbox')).toHaveValue('4444 3333 2222 1111');
    });
  });
});
