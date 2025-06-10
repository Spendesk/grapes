import React from 'react';
import { render, screen } from '@testing-library/react';

import { GrapesContext } from '../GrapesProvider/GrapesContext';
import { ModalOverlay } from './';
import { LOCALES } from '../GrapesProvider/exampleLocales';

describe('ModalHeaderWithIcon component', () => {
  it('should set inert to true when ModalOverlay is displayed', () => {
    const setInert = vi.fn();
    const { unmount } = render(
      <GrapesContext.Provider
        value={{ locale: 'en-us', localesDefinition: LOCALES, setInert }}
      >
        <ModalOverlay isOpen>
          <p>Modal body</p>
        </ModalOverlay>
      </GrapesContext.Provider>,
    );

    expect(screen.getByText('Modal body')).toBeVisible();
    expect(setInert).toHaveBeenCalledWith(true);

    unmount();

    expect(screen.queryByText('Modal body')).not.toBeInTheDocument();
    expect(setInert).toHaveBeenCalledWith(false);
  });
});
