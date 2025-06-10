/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { PasswordInput } from '../PasswordInput';
import { getConfirmPasswordRule, passwordRules } from './passwordRules';
import styles from './PasswordInput.stories.module.scss';
import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

const meta: Meta<typeof PasswordInput> = {
  title: 'Form/PasswordInput',
  component: PasswordInput,
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {
  render: (args) => {
    const [password, setPassword] = useState<string | null>(null);
    return (
      <div style={{ width: '360px' }}>
        <PasswordInput
          {...args}
          fit={'parent'}
          value={password}
          rules={passwordRules}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
  render: Default.render,
};

export const Prefilled: Story = {
  render: (args) => {
    const [password, setPassword] = useState<string | null>('123456789');
    return (
      <div style={{ width: '360px' }}>
        <PasswordInput
          {...args}
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </div>
    );
  },
};

export const FilledAndDisabled: Story = {
  args: {
    isDisabled: true,
  },
  render: Prefilled.render,
};

export const ParentFit: Story = {
  args: {
    fit: 'parent',
  },
  render: (args) => {
    const [password, setPassword] = useState<string | null>(null);
    return (
      <PasswordInput
        {...args}
        fit={'parent'}
        value={password}
        rules={passwordRules}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
    );
  },
};

export const PasswordWithConfirm: Story = {
  render: (args) => {
    const [password, setPassword] = useState<string | null>(null);
    const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
    return (
      <div style={{ width: '360px' }}>
        <PasswordInput
          {...args}
          fit={'parent'}
          rules={passwordRules}
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <PasswordInput
          {...args}
          fit={'parent'}
          className={styles.passwordConfirm}
          rules={[getConfirmPasswordRule(password)]}
          value={confirmPassword}
          onChange={(event) => {
            setConfirmPassword(event.target.value);
          }}
        />
      </div>
    );
  },
};

export const Snapshot: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <SnapshotContainer
      stories={[
        Default,
        Disabled,
        Prefilled,
        FilledAndDisabled,
        ParentFit,
        PasswordWithConfirm,
      ]}
      meta={meta}
    />
  ),
};
