import React from 'react';
import { render, screen } from '@testing-library/react';

import { Callout } from './';

describe('Callout component', () => {
  it('displays the title from props as child', () => {
    const title = 'Callout title';
    render(<Callout variant="info" title={title} />);

    expect(screen.getByRole('complementary', { name: title })).toBeVisible();
  });

  it('displays the content from props as child', () => {
    const title = 'Callout title';
    const content = 'Some content';
    render(
      <Callout variant="success" title={title}>
        {content}
      </Callout>,
    );

    expect(screen.getByRole('complementary', { name: title })).toBeVisible();
    expect(screen.getByText(content)).toBeVisible();
  });

  it('adds a className to the component', () => {
    const title = 'Callout title';
    render(<Callout className="MyCallout" variant="warning" title={title} />);

    expect(screen.getByRole('complementary', { name: title })).toHaveClass(
      'MyCallout',
    );
  });
});
