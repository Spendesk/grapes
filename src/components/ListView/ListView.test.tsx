import React from 'react';

import { render, screen } from '@testing-library/react';
import { ListView, ListItem } from './';

describe('ListView component', () => {
  it('should display all the items', () => {
    render(
      <ListView aria-label="Suppliers">
        <ListItem>Supplier1</ListItem>
        <ListItem>Supplier2</ListItem>
        <ListItem>Supplier3</ListItem>
      </ListView>,
    );

    expect(screen.getByRole('list', { name: 'Suppliers' })).toBeVisible();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByText('Supplier1')).toBeVisible();
    expect(screen.getByText('Supplier2')).toBeVisible();
    expect(screen.getByText('Supplier3')).toBeVisible();
  });

  it('should assign className', () => {
    render(
      <ListView aria-label="Suppliers" className="supplierClassName">
        <ListItem className="supplier1Class">Supplier1</ListItem>
      </ListView>,
    );

    expect(screen.getByRole('list', { name: 'Suppliers' })).toHaveClass(
      'supplierClassName',
    );
    expect(screen.getByRole('listitem')).toHaveClass('supplier1Class');
  });
});
