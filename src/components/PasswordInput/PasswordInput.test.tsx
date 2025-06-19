import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PasswordInput } from '.';
import { passwordRules } from './stories/passwordRules';
import { type PasswordRule } from './passwordRule';

import { renderWithGrapesProvider } from '../../test-utils/renderers';

describe('PasswordInput component', () => {
  it('should update password', async () => {
    const Wrapper = () => {
      const [password, setPassword] = React.useState('');
      return (
        <PasswordInput
          value={password}
          placeholder="passwordPlaceholder"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
      );
    };

    renderWithGrapesProvider(<Wrapper />);
    const textInput = screen.getByPlaceholderText('passwordPlaceholder');
    await userEvent.type(textInput, 'hello123');
    expect(textInput).toHaveValue('hello123');
  });

  it('should invalid the input when a rule is not valid', () => {
    renderWithGrapesProvider(
      <PasswordInput
        value="password1"
        rules={passwordRules}
        placeholder="passwordPlaceholder"
        onChange={vi.fn()}
      />,
    );
    const textInput = screen.getByPlaceholderText('passwordPlaceholder');
    expect(textInput).toBeInvalid();
  });

  it('should set autoComplete to new-password when rules are given', () => {
    renderWithGrapesProvider(
      <PasswordInput
        value="password1"
        rules={passwordRules}
        placeholder="passwordPlaceholder"
        onChange={vi.fn()}
      />,
    );
    const textInput = screen.getByPlaceholderText('passwordPlaceholder');
    expect(textInput).toHaveAttribute('autocomplete', 'new-password');
  });

  it('should set autoComplete to current-password when no rules are given', () => {
    renderWithGrapesProvider(
      <PasswordInput
        value="password1"
        placeholder="passwordPlaceholder"
        onChange={vi.fn()}
      />,
    );
    const textInput = screen.getByPlaceholderText('passwordPlaceholder');
    expect(textInput).toHaveAttribute('autocomplete', 'current-password');
  });

  it('should show and hide the password', async () => {
    renderWithGrapesProvider(
      <PasswordInput
        value="Spendesk1234"
        rules={passwordRules}
        placeholder="passwordPlaceholder"
        onChange={vi.fn()}
      />,
    );

    const passwordInput = screen.getByPlaceholderText('passwordPlaceholder');
    expect(passwordInput).toHaveAttribute('type', 'password');

    const showButton = screen.getByRole('button');
    await userEvent.click(showButton);

    expect(passwordInput).toHaveAttribute('type', 'text');

    await userEvent.click(showButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  describe('Given a set of rules', () => {
    const rules: PasswordRule[] = [
      {
        label: 'noticeIsCool',
        validate: (value): boolean => !!value && value === 'coolPassword',
      },
      {
        label: 'noticeCharacters',
        required: 4,
        validate: (value): boolean => !!value && value.length >= 4,
      },
      {
        label: 'no_A',
        required: 0,
        validate: (value): boolean => !!value && !value.includes('a'),
      },
    ];

    it('should display the rules', () => {
      renderWithGrapesProvider(
        <PasswordInput
          value="notcool"
          rules={rules}
          placeholder="passwordPlaceholder"
          onChange={vi.fn()}
        />,
      );

      expect(screen.getByText('noticeIsCool')).toBeVisible();
      expect(screen.getByText('4 noticeCharacters')).toBeVisible();
      expect(screen.getByText('0 no_A')).toBeVisible();
    });
  });
});
