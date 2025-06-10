import React from 'react';
import { render, screen } from '@testing-library/react';

import { DropdownItem } from './';

describe('DropdownItem component', () => {
  describe('given default props', () => {
    it('displays the label as child', () => {
      render(<DropdownItem label="My dropdown item" />);
      expect(screen.getByText('My dropdown item')).toBeVisible();
    });
  });

  describe('given a `prefix` props', () => {
    it('renders the prefix element', () => {
      render(
        <DropdownItem
          label=""
          prefix={<div className="prefixElement">Prefix</div>}
        />,
      );
      expect(screen.getByText('Prefix')).toBeVisible();
    });
  });

  describe('given a `suffix` props', () => {
    it('renders the suffix element', () => {
      render(
        <DropdownItem
          label=""
          suffix={<div className="suffixElement">Suffix</div>}
        />,
      );
      expect(screen.getByText('Suffix')).toBeVisible();
    });
  });

  describe('given a `helpText` props', () => {
    it('renders this text', () => {
      const helpText = 'Put something helpful here';
      render(<DropdownItem label="" helpText={helpText} />);
      expect(screen.getByText(helpText)).toBeVisible();
    });
  });
});
