import React, { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Accordion, AccordionItem } from './';
import { Button } from '../Button';

describe('Accordion component', () => {
  it('supports a default open item', () => {
    render(
      <Accordion>
        <AccordionItem renderHeader={() => <div>Header 1</div>}>
          {<div>Content 1</div>}
        </AccordionItem>
        <AccordionItem open renderHeader={() => <div>Header 2</div>}>
          {<div>Content 2</div>}
        </AccordionItem>
        <AccordionItem renderHeader={() => <div>Header 3</div>}>
          {<div>Content 3</div>}
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.getByText('Header 1')).toBeVisible();
    expect(screen.getByText('Header 2')).toBeVisible();
    expect(screen.getByText('Header 3')).toBeVisible();
    expect(screen.getByText('Content 1')).not.toBeVisible();
    expect(screen.getByText('Content 2')).toBeVisible();
    expect(screen.getByText('Content 3')).not.toBeVisible();
  });

  it('supports only one item', async () => {
    render(
      <Accordion>
        <AccordionItem renderHeader={() => <div>Header 1</div>}>
          {<div>Content 1</div>}
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.getByText('Header 1')).toBeVisible();
    expect(screen.getByText('Content 1')).not.toBeVisible();

    await userEvent.click(screen.getByText('Header 1'));

    expect(screen.getByText('Content 1')).toBeVisible();

    await userEvent.click(screen.getByText('Header 1'));

    await waitFor(() =>
      expect(screen.getByText('Content 1')).not.toBeVisible(),
    );
  });

  it('supports programmatically open and close an item', async () => {
    const Wrapper = () => {
      const [openItemIndex, setOpenItemIndex] = useState(-1);

      return (
        <>
          <Accordion>
            {Array.from({ length: 2 }, (_, i) => {
              const open = openItemIndex === i;
              return (
                <AccordionItem
                  key={i}
                  open={open}
                  renderHeader={() => <div>{`Header ${i}`}</div>}
                >
                  {<div>{`Content ${i}`}</div>}
                </AccordionItem>
              );
            })}
          </Accordion>
          <Button onClick={() => setOpenItemIndex(0)} text="Open Header 0" />
          <Button onClick={() => setOpenItemIndex(1)} text="Open Header 1" />
          <Button onClick={() => setOpenItemIndex(-1)} text="Close" />
        </>
      );
    };

    render(<Wrapper />);

    expect(screen.getByText('Content 0')).not.toBeVisible();
    expect(screen.getByText('Content 1')).not.toBeVisible();

    await userEvent.click(
      screen.getByRole('button', { name: 'Open Header 0' }),
    );

    expect(screen.getByText('Content 0')).toBeVisible();
    expect(screen.getByText('Content 1')).not.toBeVisible();

    await userEvent.click(screen.getByRole('button', { name: 'Close' }));

    expect(screen.getByText('Content 0')).not.toBeVisible();
    expect(screen.getByText('Content 1')).not.toBeVisible();
  });

  it('calls onToggle when details opens or closes', async () => {
    const handleToggle = vi.fn();

    render(
      <Accordion>
        <AccordionItem
          key="1"
          onToggle={handleToggle}
          renderHeader={() => <div>Header</div>}
        >
          <div>Content</div>
        </AccordionItem>
      </Accordion>,
    );

    expect(handleToggle).not.toHaveBeenCalled();

    await userEvent.click(screen.getByText('Header'));

    expect(handleToggle).toHaveBeenCalledExactlyOnceWith(true);

    await userEvent.click(screen.getByText('Header'));

    expect(handleToggle).toHaveBeenLastCalledWith(false);
  });

  it('calls onToggle when details opens or closes', async () => {
    const Wrapper = () => {
      const [openItem, setOpenItem] = useState(false);

      return (
        <Accordion>
          <AccordionItem
            key="1"
            open={openItem}
            onToggle={(open) => setOpenItem(open)}
            renderHeader={() => <div>Header</div>}
          >
            <div>Content</div>
          </AccordionItem>
        </Accordion>
      );
    };

    render(<Wrapper />);

    expect(screen.getByText('Content')).not.toBeVisible();

    await userEvent.click(screen.getByText('Header'));

    expect(screen.getByText('Content')).toBeVisible();

    await userEvent.click(screen.getByText('Header'));

    expect(screen.getByText('Content')).not.toBeVisible();
  });
});
