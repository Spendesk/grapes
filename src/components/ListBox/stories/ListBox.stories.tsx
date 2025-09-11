import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Avatar } from '../../Avatar';
import { ListBox } from '../ListBox';
import { Button } from '../../Button';

import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

import styles from './ListBox.module.css';
import { Select } from '../../Select';
import { action } from 'storybook/actions';

type Data = {
  id: string;
  name: string;
  birthDate: string;
  avatar: string;
  description: string;
};
const meta: Meta<typeof ListBox> = {
  title: 'Data display/ListBox',
  component: ListBox,
  tags: ['legacy'],
};

export default meta;
type Story = StoryObj<typeof ListBox<Data>>;

export const Primary: Story = {
  render: (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeOption, setActiveOption] = useState<string | undefined>();

    return (
      <ListBox
        {...props}
        getIsOptionActive={(option) => option.id === activeOption}
        onOptionClick={(option) => {
          setActiveOption(option.id);
        }}
        aria-label="Employees"
      />
    );
  },
  args: {
    options: [
      {
        id: 'michael',
        name: 'Michael Murphy',
        birthDate: '1979-09-19',
        avatar: 'images/aurelien.webp',
        description: 'Growth team',
      },
      {
        id: 'nayden',
        name: 'Nayden Lennart',
        birthDate: '1980-03-01',
        avatar: 'images/bertrand.webp',
        description: 'Design team',
      },
      {
        id: 'nicolas',
        name: 'Nicolas Harvey',
        birthDate: '1980-06-05',
        avatar: 'images/mahedine.webp',
        description: 'Growth team',
      },
      {
        id: 'lewis',
        name: 'Lewis Barker',
        birthDate: '1980-07-30',
        avatar: 'images/jean.webp',
        description: 'Design team',
      },
      {
        id: 'george',
        name: 'George Gray',
        birthDate: '1980-07-31',
        avatar: 'images/laurent.webp',
        description: 'Design team',
      },
      {
        id: 'laura',
        name: 'Laura Lagarde',
        birthDate: '1981-02-13',
        avatar: 'images/chloe.webp',
        description: 'Marketing team',
      },
    ],
    getOptionId: (option) => option.id,
    children: (option, titleId) => {
      const dtf = new Intl.DateTimeFormat();
      return (
        <div className={styles.grid}>
          <Avatar variant="circle" src={option.avatar} text={option.name} />
          <div>
            <div className={styles.justifyBetween}>
              <span id={titleId}>{option.name}</span>
              <span>{dtf.format(new Date(option.birthDate))}</span>
            </div>
            <div className={styles.body}>{option.description}</div>
          </div>
        </div>
      );
    },
  },
};

export const EmptyList: Story = {
  ...Primary,
  args: {
    options: [],
    emptyState: {
      title: 'No employee found',
    },
    getOptionId: (option) => option.id,
    children: (option) => {
      return <div>{option.description}</div>;
    },
  },
};

export const WithRowVariant: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    getOptionVariant: (option) => {
      switch (option.id) {
        case 'george':
          return 'alert';
        case 'lewis':
          return 'warning';
        default:
          return undefined;
      }
    },
  },
};

export const GroupBy: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    groupBy: (option) => {
      const date = new Date(option.birthDate);
      return `${date.getFullYear()}`;
    },
    renderGroupedOptionsHeader: (value, aggregatedOptions) => {
      const aggregatedCount = aggregatedOptions.length;
      return (
        <div className={styles.justifyBetween}>
          <span>{value}</span>
          <span>
            {aggregatedCount} {aggregatedCount > 1 ? 'members' : 'member'}
          </span>
        </div>
      );
    },
  },
};

export const GroupByWithHeaderAndFooter: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    header: <div className={styles.header}>Members</div>,
    footer: (
      <div style={{ margin: 'var(--grapes-unit-8) auto' }}>
        <Button text="Load more" variant="secondaryNeutral" fit="content" />
      </div>
    ),
    groupBy: (option) => {
      const date = new Date(option.birthDate);
      return `${date.getFullYear()}`;
    },
    renderGroupedOptionsHeader: (value, aggregatedOptions) => {
      const aggregatedCount = aggregatedOptions.length;
      return (
        <div className={styles.justifyBetween}>
          <span>{value}</span>
          <span>
            {aggregatedCount} {aggregatedCount > 1 ? 'members' : 'member'}
          </span>
        </div>
      );
    },
  },
};

export const WithAFooter: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    footer: (
      <div style={{ margin: 'var(--grapes-unit-8) auto' }}>
        <Button text="Load more" variant="secondaryNeutral" fit="content" />
      </div>
    ),
  },
};

export const WithAHeader: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    header: <div className={styles.header}>Members</div>,
  },
};

export const Compact: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    rowHeight: 'compact',
    children: (option, titleId) => {
      const dtf = new Intl.DateTimeFormat();
      return (
        <div className={styles.grid}>
          <Avatar variant="circle" src={option.avatar} text={option.name} />
          <div className={styles.justifyBetween}>
            <span id={titleId}>{option.name}</span>
            <span>{dtf.format(new Date(option.birthDate))}</span>
          </div>
        </div>
      );
    },
  },
};

export const WithoutClick: Story = {
  ...Primary,
  args: {
    ...Primary.args,
  },
  render: (props) => <ListBox {...props} aria-label="Employees" />,
};

export const SelectOption: Story = {
  args: {
    ...Primary.args,
    checkedOptionIds: ['nayden', 'nicolas'],
    header: <p className={styles.header}>Employee</p>,
  },
  render: (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [optionsSelected, setOptionSelected] = useState<string[]>(
      props.checkedOptionIds || [],
    );
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeOption, setActiveOption] = useState<string | undefined>();

    return (
      <ListBox
        {...props}
        onOptionChange={(_, id, checked) => {
          setOptionSelected((options) => {
            if (checked) {
              return options.concat(id);
            }
            return options.filter((optionId) => optionId !== id);
          });
        }}
        getIsOptionActive={(option) => option.id === activeOption}
        onOptionClick={(option) => setActiveOption(option.id)}
        onAllOptionsChange={(_, ids, checked) => {
          setOptionSelected(checked ? ids : []);
        }}
        checkedOptionIds={optionsSelected}
        aria-label="employees"
      />
    );
  },
};

export const WithDisabledOption: Story = {
  ...SelectOption,
  args: {
    ...SelectOption.args,
    getIsOptionDisabled: (option) => option.id === 'laura',
  },
};

export const WithOnlyDisabledOptions: Story = {
  ...SelectOption,
  args: {
    ...SelectOption.args,
    checkedOptionIds: [],
    getIsOptionDisabled: () => true,
  },
};

export const WithNonCheckableOption: Story = {
  ...SelectOption,
  args: {
    ...SelectOption.args,
    getIsOptionCheckable: (option) => option.id !== 'laura',
  },
};

export const Snapshot: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <SnapshotContainer
      stories={[
        Primary,
        EmptyList,
        WithRowVariant,
        GroupBy,
        GroupByWithHeaderAndFooter,
        WithAFooter,
        WithAHeader,
        Compact,
        WithoutClick,
        SelectOption,
        WithDisabledOption,
        WithOnlyDisabledOptions,
        WithNonCheckableOption,
      ]}
      meta={meta}
    />
  ),
};

const costCenters = [
  { key: 'marketing', label: 'Marketing' },
  { key: 'legal', label: 'Legal' },
  { key: 'office', label: 'Office' },
  { key: 'platform', label: 'Platform' },
  { key: 'finance', label: 'Finance' },
  { key: 'product', label: 'Product' },
  { key: 'engineering', label: 'Engineering' },
];

export const WithDropdownInside: Story = {
  render: (props) => {
    return <ListBox {...props} aria-label="Employees" />;
  },
  args: {
    options: [
      {
        id: 'michael',
        name: 'Michael Murphy',
        birthDate: '1979-09-19',
        avatar: 'images/aurelien.webp',
        description: 'Growth team',
      },
      {
        id: 'nayden',
        name: 'Nayden Lennart',
        birthDate: '1980-03-01',
        avatar: 'images/bertrand.webp',
        description: 'Design team',
      },
      {
        id: 'nicolas',
        name: 'Nicolas Harvey',
        birthDate: '1980-06-05',
        avatar: 'images/mahedine.webp',
        description: 'Growth team',
      },
      {
        id: 'lewis',
        name: 'Lewis Barker',
        birthDate: '1980-07-30',
        avatar: 'images/jean.webp',
        description: 'Design team',
      },
      {
        id: 'george',
        name: 'George Gray',
        birthDate: '1980-07-31',
        avatar: 'images/laurent.webp',
        description: 'Design team',
      },
      {
        id: 'laura',
        name: 'Laura Lagarde',
        birthDate: '1981-02-13',
        avatar: 'images/chloe.webp',
        description: 'Marketing team',
      },
    ],
    getOptionId: (option) => option.id,
    children: (option, titleId) => {
      return (
        <div className={styles.grid}>
          <Avatar variant="circle" src={option.avatar} text={option.name} />
          <div className={styles.centeredJustifyBetween}>
            <span id={titleId}>{option.name}</span>
            <div
              style={{
                padding: '16px',
                minWidth: '400px',
              }}
            >
              <Select
                value={undefined}
                onSelect={action('onSelect')}
                options={costCenters}
              />
            </div>
          </div>
        </div>
      );
    },
  },
};
