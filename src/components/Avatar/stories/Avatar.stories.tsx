import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { SnapshotContainer } from '../../../test-utils/SnapshotsContainer';

import { Avatar } from '../Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Data display/Avatar',
  component: Avatar,
  parameters: { chromatic: { diffThreshold: 0 } },
  tags: ['legacy'],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Circle: Story = {
  args: {
    variant: 'circle',
    src: 'images/aurelien.webp',
    text: 'Michael Murphy',
  },
};
export const Square: Story = {
  args: {
    variant: 'square',
    text: 'Nayden Lennart',
    src: 'images/bertrand.webp',
  },
};
export const ExtraSmall: Story = {
  args: {
    ...Circle.args,
    size: 16,
  },
};
export const Small: Story = {
  args: {
    ...Circle.args,
    size: 24,
  },
};
export const Medium: Story = {
  args: {
    ...Circle.args,
    size: 32,
  },
};
export const Large: Story = {
  args: {
    ...Circle.args,
    size: 40,
  },
};
export const ExtraLarge: Story = {
  args: {
    ...Circle.args,
    size: 56,
  },
};

export const CircleWithBadge: Story = {
  args: {
    variant: 'circle',
    size: 32,
    text: 'Michael Murphy',
    badgeProps: {
      src: 'images/chloe.webp',
      variant: 'square',
      text: 'Laura Lagarde',
    },
  },
};
export const SquareWithBadge: Story = {
  args: {
    variant: 'square',
    size: 32,
    text: 'Michael Murphy',
    badgeProps: {
      src: 'images/chloe.webp',
      variant: 'circle',
      text: 'Laura Lagarde',
    },
  },
};

export const SquareWithIconBadge: Story = {
  args: {
    variant: 'square',
    size: 32,
    text: 'Michael Murphy',
    src: 'images/chloe.webp',
    badgeProps: {
      iconName: 'person',
      variant: 'circle',
      text: 'Laura Lagarde',
    },
  },
};

export const FallbackSrc: Story = {
  args: {
    text: 'Spendesk',
    fallbackSrc: 'images/jean.webp',
    variant: 'circle',
    size: 32,
  },
};

export const WithIcon: Story = {
  args: {
    text: 'User',
    iconName: 'person',
    variant: 'circle',
    size: 32,
  },
};
export const FallbackTextApricot: Story = {
  args: {
    text: 'A',
    size: 24,
  },
};
export const FallbackTextLemon: Story = {
  args: {
    text: 'B',
    size: 24,
  },
};
export const FallbackTextPeach: Story = {
  args: {
    text: 'C',
    size: 24,
  },
};
export const FallbackTextBlue: Story = {
  args: {
    text: 'D',
    size: 24,
  },
};
export const FallbackTextPink: Story = {
  args: {
    text: 'E',
    size: 24,
  },
};
export const FallbackTextOcean: Story = {
  args: {
    text: 'F',
    size: 24,
  },
};
export const FallbackTextForest: Story = {
  args: {
    text: 'G',
    size: 24,
  },
};
export const FallbackTextEmerald: Story = {
  args: {
    text: 'H',
    size: 24,
  },
};
export const FallbackTextRaspberry: Story = {
  args: {
    text: 'I',
    size: 24,
  },
};

export const Snapshot: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <SnapshotContainer
      stories={[
        Circle,
        Square,
        ExtraSmall,
        Small,
        Medium,
        Large,
        ExtraLarge,
        CircleWithBadge,
        SquareWithBadge,
        SquareWithIconBadge,
        FallbackSrc,
        WithIcon,
        FallbackTextApricot,
        FallbackTextLemon,
        FallbackTextPeach,
        FallbackTextBlue,
        FallbackTextPink,
        FallbackTextOcean,
        FallbackTextForest,
        FallbackTextEmerald,
      ]}
      meta={meta}
    />
  ),
};
