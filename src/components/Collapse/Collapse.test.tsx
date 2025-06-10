import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import { Collapse } from './';

describe('Collapse component', () => {
  describe('given default props', () => {
    it('should render the Collpase component with a header and children', async () => {
      const header = 'Collapse header';
      const children = 'Collapse content';

      render(<Collapse renderHeader={() => header}>{children}</Collapse>);

      expect(screen.getByText(header)).toBeVisible();
      expect(screen.getByText(children)).toBeVisible();

      await user.click(screen.getByText(header));

      expect(screen.getByText(children)).not.toBeVisible();
    });
  });

  describe('given `open` props set to false', () => {
    it('should render the Collpase component with a header and children', async () => {
      const header = 'Collapse header';
      const children = 'Collapse content';

      render(
        <Collapse open={false} renderHeader={() => header}>
          {children}
        </Collapse>,
      );

      expect(screen.getByText(header)).toBeVisible();
      expect(screen.getByText(children)).not.toBeVisible();

      await user.click(screen.getByText(header));

      expect(screen.getByText(children)).toBeVisible();
    });
  });
});
