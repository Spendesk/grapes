import { describe, it } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Tabs, TabList, Tab, TabPanels, TabPanel } from './';
import { Icon } from '../Icon';

describe('Tabs component', () => {
  it('supports navigate between tabs', async () => {
    render(
      <Tabs>
        <TabList>
          <Tab>One</Tab>
          <Tab>Two</Tab>
          <Tab>Three</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>First panel</TabPanel>
          <TabPanel>Second panel</TabPanel>
          <TabPanel>Third panel</TabPanel>
        </TabPanels>
      </Tabs>,
    );

    expect(screen.getByRole('tab', { name: 'One' })).toBeVisible();
    expect(screen.getByRole('tab', { name: 'Two' })).toBeVisible();
    expect(screen.getByRole('tab', { name: 'Three' })).toBeVisible();

    expect(screen.getByText('First panel')).toBeVisible();

    await userEvent.click(screen.getByRole('tab', { name: 'Two' }));
    expect(screen.queryByText('First panel')).not.toBeVisible();
    expect(screen.getByText('Second panel')).toBeVisible();

    await userEvent.click(screen.getByRole('tab', { name: 'Three' }));
    expect(screen.queryByText('Second panel')).not.toBeVisible();
    expect(screen.getByText('Third panel')).toBeVisible();
  });

  it('supports display a defined tab', () => {
    render(
      <Tabs defaultTabIndex={1}>
        <TabList>
          <Tab>One</Tab>
          <Tab>Two</Tab>
          <Tab>Three</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>First panel</TabPanel>
          <TabPanel>Second panel</TabPanel>
          <TabPanel>Third panel</TabPanel>
        </TabPanels>
      </Tabs>,
    );

    expect(screen.getByText('Second panel')).toBeVisible();
    expect(screen.queryByText('First panel')).not.toBeVisible();
    expect(screen.queryByText('Third panel')).not.toBeVisible();
  });

  it('supports keyboard navigation', async () => {
    render(
      <Tabs>
        <TabList>
          <Tab>One</Tab>
          <Tab>Two</Tab>
          <Tab>Three</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>First panel</TabPanel>
          <TabPanel>Second panel</TabPanel>
          <TabPanel>Third panel</TabPanel>
        </TabPanels>
      </Tabs>,
    );

    await userEvent.click(screen.getByRole('tab', { name: 'Two' }));
    expect(screen.getByRole('tabpanel', { name: 'Two' })).toBeVisible();

    await userEvent.keyboard('{arrowright}');
    expect(screen.getByRole('tabpanel', { name: 'Three' })).toBeVisible();

    await userEvent.keyboard('{arrowright}');
    expect(screen.getByRole('tabpanel', { name: 'One' })).toBeVisible();

    await userEvent.keyboard('{arrowright}');
    expect(screen.getByRole('tabpanel', { name: 'Two' })).toBeVisible();

    await userEvent.keyboard('{arrowleft}');
    expect(screen.getByRole('tabpanel', { name: 'One' })).toBeVisible();

    await userEvent.keyboard('{end}');
    expect(screen.getByRole('tabpanel', { name: 'Three' })).toBeVisible();

    await userEvent.keyboard('{home}');
    expect(screen.getByRole('tabpanel', { name: 'One' })).toBeVisible();
  });

  it('supports onChange callback', async () => {
    const onChangeSpy = vi.fn();
    render(
      <Tabs onChange={onChangeSpy}>
        <TabList>
          <Tab>One</Tab>
          <Tab>Two</Tab>
          <Tab>Three</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>First panel</TabPanel>
          <TabPanel>Second panel</TabPanel>
          <TabPanel>Third panel</TabPanel>
        </TabPanels>
      </Tabs>,
    );

    await userEvent.click(screen.getByRole('tab', { name: 'Two' }));
    expect(onChangeSpy).toHaveBeenLastCalledWith(1);

    await userEvent.click(screen.getByRole('tab', { name: 'Three' }));
    expect(onChangeSpy).toHaveBeenLastCalledWith(2);

    await userEvent.click(screen.getByRole('tab', { name: 'One' }));
    expect(onChangeSpy).toHaveBeenLastCalledWith(0);
  });

  it('supports ARIA attributs', () => {
    render(
      <Tabs>
        <TabList>
          <Tab>One</Tab>
          <Tab>Two</Tab>
          <Tab>Three</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>First panel</TabPanel>
          <TabPanel>Second panel</TabPanel>
          <TabPanel>Third panel</TabPanel>
        </TabPanels>
      </Tabs>,
    );

    const tabOne = screen.getByRole('tab', { name: 'One' });
    expect(tabOne).toHaveAttribute('aria-selected', 'true');
    expect(tabOne).toHaveAttribute('tabIndex', '0');

    const tabTwo = screen.getByRole('tab', { name: 'Two' });
    expect(tabTwo).toHaveAttribute('aria-selected', 'false');
    expect(tabTwo).toHaveAttribute('tabIndex', '-1');

    expect(screen.getByRole('tabpanel', { name: 'One' })).toBeVisible();
    expect(screen.getByRole('tabpanel', { name: 'One' })).toHaveTextContent(
      'First panel',
    );
  });

  it('supports controlled tabs', async () => {
    const Wrapper = () => {
      const [index, setIndex] = React.useState(1);
      return (
        <>
          <button type="button" onClick={() => setIndex((i) => i + 1)}>
            Next
          </button>
          <button type="button" onClick={() => setIndex((i) => i - 1)}>
            Previous
          </button>
          <Tabs tabIndex={index}>
            <TabList>
              <Tab>One</Tab>
              <Tab>Two</Tab>
              <Tab>
                {index === 2 ? <Icon name="triangle-warning" /> : undefined}
                Three
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>First panel</TabPanel>
              <TabPanel>Second panel</TabPanel>
              <TabPanel>Third panel</TabPanel>
            </TabPanels>
          </Tabs>
        </>
      );
    };
    render(<Wrapper />);

    expect(screen.getByText('Second panel')).toBeVisible();

    await userEvent.click(screen.getByText('Next'));

    expect(await screen.findByText('Third panel')).toBeVisible();
    expect(await screen.findByRole('img')).toBeVisible();
    expect(screen.queryByText('Second panel')).not.toBeVisible();

    await userEvent.click(screen.getByText('Previous'));
    await userEvent.click(screen.getByText('Previous'));
    expect(await screen.findByText('First panel')).toBeVisible();
    expect(screen.queryByText('Second panel')).not.toBeVisible();
    expect(screen.queryByText('Third panel')).not.toBeVisible();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
