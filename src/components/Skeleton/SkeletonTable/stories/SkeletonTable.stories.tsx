import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { SkeletonCheckbox } from '../../SkeletonCheckbox';
import { SkeletonText } from '../../SkeletonText';
import { SkeletonTable } from '../SkeletonTable';

import styles from './DemoSkeletonTable.module.scss';

const meta: Meta<typeof SkeletonTable> = {
  title: 'Skeleton/Table',
  component: SkeletonTable,
  args: {
    columns: [
      {
        header: (
          <>
            <SkeletonCheckbox className={styles.demoSkeletonTableCheckbox} />
            <SkeletonText width="50%" />
          </>
        ),
        cell: (
          <>
            <SkeletonCheckbox className={styles.demoSkeletonTableCheckbox} />
            <SkeletonText width="80%" />
          </>
        ),
      },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof SkeletonTable>;

export const Default: Story = {
  args: {
    withHeader: true,
  },
};

export const Compact: Story = {
  args: {
    withHeader: true,
    rowHeight: 'compact',
  },
};

export const WithColumnSeparator = {
  args: {
    withHeader: true,
    withColumnSeparator: true,
    columns: [
      {
        width: '30%',
        header: <SkeletonText width="50%" />,
        cell: <SkeletonText width="80%" />,
      },
      {
        width: '50%',
        header: <SkeletonText width="50%" />,
        cell: <SkeletonText width="80%" />,
      },
      {
        width: '20%',
        header: <SkeletonText width="50%" />,
        cell: <SkeletonText width="80%" />,
      },
    ],
  },
};

export const WithoutHeader: Story = {
  args: {
    columns: [
      {
        cell: (
          <>
            <SkeletonCheckbox className={styles.demoSkeletonTableCheckbox} />
            <SkeletonText width="80%" />
          </>
        ),
      },
    ],
  },
};

export const WithCustomNumberOfRows: Story = {
  args: {
    withHeader: true,
    numberOfRows: 3,
  },
};
