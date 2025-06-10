import React from 'react';
import { render, screen, within } from '@testing-library/react';

import { Timeline, TimelineItem } from './';
import { GrapesProvider } from '../GrapesProvider';
import { LOCALES } from '../GrapesProvider/exampleLocales';

describe('Timeline component', () => {
  it('renders the Timeline', () => {
    render(
      <Timeline>
        <TimelineItem date={new Date('2021-01-08T09:24:00')}>
          <section>
            <div>Validated by Finance Team</div>
            <div>Amount requested: 39€</div>
          </section>
        </TimelineItem>
        <TimelineItem date={new Date('2021-02-15T15:29:00')}>
          <section>
            <div>Submitted by Roger Dupont</div>
            <div>Amount requested: 38€</div>
          </section>
        </TimelineItem>
      </Timeline>,
    );

    expect(screen.getByRole('list')).toBeVisible();

    const januaryItem = screen.getByRole('listitem', {
      name: /january 8, 2021 at 9:24/i,
    });
    expect(
      within(januaryItem).getByText('Validated by Finance Team'),
    ).toBeVisible();
    expect(
      within(januaryItem).getByText('Amount requested: 39€'),
    ).toBeVisible();

    const februaryItem = screen.getByRole('listitem', {
      name: /february 15, 2021 at 3:29/i,
    });
    expect(
      within(februaryItem).getByText('Submitted by Roger Dupont'),
    ).toBeVisible();
    expect(
      within(februaryItem).getByText('Amount requested: 38€'),
    ).toBeVisible();
  });

  it('supports custom renderDate function on Timeline', () => {
    render(
      <Timeline renderDate={(date) => `custom renderDateFn ${date.getDate()}`}>
        <TimelineItem date={new Date('2021-01-08T09:24:00')}>
          <section>
            <div>Validated by Finance Team</div>
            <div>Amount requested: 39€</div>
          </section>
        </TimelineItem>
        <TimelineItem date={new Date('2021-02-15T15:29:00')}>
          <section>
            <div>Submitted by Roger Dupont</div>
            <div>Amount requested: 38€</div>
          </section>
        </TimelineItem>
      </Timeline>,
    );

    expect(
      screen.getByRole('listitem', { name: 'custom renderDateFn 8' }),
    ).toBeVisible();
    expect(
      screen.getByRole('listitem', { name: 'custom renderDateFn 15' }),
    ).toBeVisible();
  });

  it('supports custom renderDate function on TimelineItem', () => {
    render(
      <Timeline>
        <TimelineItem
          date={new Date('2021-01-08T09:24:00')}
          renderDate={(date) => `custom renderDateFn ${date.getDate()}`}
        >
          <section>
            <div>Validated by Finance Team</div>
            <div>Amount requested: 39€</div>
          </section>
        </TimelineItem>
        <TimelineItem date={new Date('2021-02-15T15:29:00')}>
          <section>
            <div>Submitted by Roger Dupont</div>
            <div>Amount requested: 38€</div>
          </section>
        </TimelineItem>
      </Timeline>,
    );

    expect(
      screen.getByRole('listitem', { name: 'custom renderDateFn 8' }),
    ).toBeVisible();
    expect(
      screen.queryByRole('listitem', { name: 'custom renderDateFn 15' }),
    ).not.toBeInTheDocument();
  });

  it('supports locale', () => {
    render(
      <GrapesProvider locale="fr-FR" localesDefinition={LOCALES}>
        <Timeline>
          <TimelineItem date={new Date('2021-01-08T09:24:00')}>
            <section>
              <div>Validated by Finance Team</div>
              <div>Amount requested: 39€</div>
            </section>
          </TimelineItem>
          <TimelineItem date={new Date('2021-02-15T15:29:00')}>
            <section>
              <div>Submitted by Roger Dupont</div>
              <div>Amount requested: 38€</div>
            </section>
          </TimelineItem>
        </Timeline>
        ,
      </GrapesProvider>,
    );

    expect(
      screen.getByRole('listitem', { name: /8 janvier 2021 à 09:24/i }),
    ).toBeVisible();
    expect(
      screen.getByRole('listitem', { name: /15 février 2021 à 15:29/i }),
    ).toBeVisible();
  });
});

describe('TimelineItem', () => {
  it('throws if no TimelineContext is defined', () => {
    expect(() =>
      render(<TimelineItem date={new Date()}>Throw</TimelineItem>),
    ).toThrowError();
  });
});
