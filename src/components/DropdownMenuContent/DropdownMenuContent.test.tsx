import React from 'react';
import { render, screen } from '@testing-library/react';

import { DropdownMenuContent } from './';

describe('DropdownMenuContent component', () => {
  const options = [
    { key: '1', label: 'option 1' },
    { key: '2', label: 'option 2' },
  ];

  describe('given default props', () => {
    it('renders the menu with the options', () => {
      render(
        <DropdownMenuContent
          isOpen
          options={options}
          getMenuProps={vi.fn()}
          getItemProps={vi.fn()}
          renderOption={(option) => option.label}
        />,
      );

      expect(screen.getByRole('list')).toBeVisible();
      expect(screen.getByText('option 1')).toBeVisible();
      expect(screen.getByText('option 2')).toBeVisible();
      expect(screen.getAllByRole('listitem')).toHaveLength(2);
    });
  });

  describe('given `renderOption` props', () => {
    it('calls `renderOption` with the right parameters for each given option', () => {
      const renderOption = vi.fn();
      render(
        <DropdownMenuContent
          isOpen
          options={options}
          renderOption={renderOption}
          getMenuProps={vi.fn()}
          getItemProps={vi.fn()}
        />,
      );

      expect(renderOption).toHaveBeenNthCalledWith(1, options[0], 0);
      expect(renderOption).toHaveBeenNthCalledWith(2, options[1], 1);
    });
  });

  describe('given some option groups', () => {
    const options = [
      { key: '1', label: 'option 1' },
      {
        key: 'group',
        label: 'Group',
        options: [{ key: '2', label: 'option 2' }],
      },
      { key: '3', label: 'option 3' },
    ];

    describe('when opening the menu', () => {
      it('renders the menu with the options', () => {
        render(
          <DropdownMenuContent
            isOpen
            options={options}
            getMenuProps={vi.fn()}
            getItemProps={vi.fn()}
            renderOption={(option) => option.label}
          />,
        );

        expect(screen.getByRole('list')).toBeVisible();
        expect(screen.getByText('option 1')).toBeVisible();
        expect(screen.getByText('option 2')).toBeVisible();
        expect(screen.getByText('option 3')).toBeVisible();
        expect(screen.getAllByRole('listitem')).toHaveLength(3);
      });
    });

    describe('given `renderOptionGroup` props', () => {
      it('calls `renderOptionGroup` with the right parameters', () => {
        const renderOptionGroup = vi.fn();
        render(
          <DropdownMenuContent
            isOpen
            options={options}
            renderOptionGroup={renderOptionGroup}
            renderOption={vi.fn()}
            getMenuProps={vi.fn()}
            getItemProps={vi.fn()}
          />,
        );

        expect(renderOptionGroup).toHaveBeenNthCalledWith(1, options[1]);
      });
    });
  });
});
