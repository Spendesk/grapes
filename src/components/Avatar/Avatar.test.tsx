import React from 'react';
import { render, screen, act } from '@testing-library/react';

import { Avatar } from './';

const originalImage = window.Image;
function restoreImage() {
  window.Image = originalImage;
}

/**
 * A Image mock that allows you to trigger `onload` event on demand.
 */
function mockImage() {
  const listeners: (() => void)[] = [];
  const event = {
    listen: (callback: () => void) => {
      listeners.push(callback);
    },
    onload: () => {
      listeners.forEach((listener) => listener());
    },
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  window.Image = class Image {
    src = '';
    onload = () => {
      new Error('onload is not defined on the targeted Image');
    };

    constructor() {
      event.listen(() => {
        act(() => this.onload());
      });
    }
  };

  return { onload: event.onload };
}

describe('Avatar component', () => {
  beforeEach(() => {
    restoreImage();
  });

  describe('given src props', () => {
    it('displays an image tag as child with the `src` from props', async () => {
      const { onload } = mockImage();
      render(
        <Avatar variant="circle" src="https://placedog.net/401" text="A dog" />,
      );

      // While the image is loading, a placeholder is put in place
      expect(screen.getByRole('img', { name: 'A dog' })).not.toHaveAttribute(
        'src',
        'https://placedog.net/401',
      );

      // Trigger onload
      onload();

      // Image is now displayed
      expect(await screen.findByRole('img', { name: 'A dog' })).toHaveAttribute(
        'src',
        'https://placedog.net/401',
      );
    });

    it('displays the right icon when iconName is provided', () => {
      render(<Avatar variant="circle" iconName="person" text="User" />);

      expect(screen.getByRole('img')).toHaveAttribute('data-icon', 'person');
    });
  });

  describe('given src is not provided', () => {
    it.each([
      { name: 'Nayden Lennart', size: 24 as const, expected: 'N' },
      { name: '  Nayden Lennart', size: 40 as const, expected: 'N' },
      {
        name: `
  Nayden Lennart`,
        size: 32 as const,
        expected: 'N',
      },
      { name: '(-+=_)Nayden Lennart', size: 16 as const, expected: 'N' },
      { name: '%%_$', size: 16 as const, expected: '' },
    ])(
      'displays $expected given $name as name and $size as size',
      ({ name, size, expected }) => {
        render(<Avatar variant="circle" text={name} size={size} />);
        expect(
          screen.getByRole('img', { name: name.trim() }),
        ).toHaveTextContent(expected);
      },
    );

    it('displays the image when src is given after the first render', () => {
      const { onload } = mockImage();
      const text = 'Nayden Lennart';
      const { rerender } = render(<Avatar variant="circle" text={text} />);

      onload();
      // Avatar always gets the role img, however, properties are different from a img and a span
      expect(screen.getByRole('img', { name: text })).not.toHaveProperty('src');

      rerender(
        <Avatar variant="circle" text={text} src="https://placedog.net/401" />,
      );

      onload();
      expect(screen.getByRole('img', { name: text })).toHaveProperty(
        'src',
        'https://placedog.net/401',
      );
    });

    it('fallbacks on fallbackSrc when given', () => {
      const text = 'Nayden Lennart';
      render(
        <Avatar
          variant="circle"
          text={text}
          fallbackSrc="https://placedog.net/201"
        />,
      );

      expect(screen.getByRole('img', { name: text })).toHaveProperty(
        'src',
        'https://placedog.net/201',
      );
    });
  });

  describe('given a `badgeProps` props', () => {
    describe('when `badgeProps` uses `src` and `alt` properties', () => {
      it('contains a `Avatar` as child with the props inherited from `badgeProps`', () => {
        const { onload } = mockImage();
        render(
          <Avatar
            variant="circle"
            src="https://placedog.net/401"
            text="A dog"
            badgeProps={{
              src: 'https://placedog.net/500',
              text: 'A corgi running',
              variant: 'square',
            }}
          />,
        );
        onload();

        expect(screen.getByRole('img', { name: 'A dog' })).toHaveAttribute(
          'src',
          'https://placedog.net/401',
        );

        expect(
          screen.getByRole('img', { name: 'A corgi running' }),
        ).toHaveAttribute('src', 'https://placedog.net/500');
      });
    });

    describe('when `badgeProps` uses `children` property', () => {
      it('contains a `Avatar` as child with the props inherited from `badgeProps`', () => {
        const { onload } = mockImage();
        render(
          <Avatar
            variant="circle"
            size={40}
            src="https://placedog.net/401"
            text="A dog"
            badgeProps={{
              text: 'A',
              variant: 'square',
            }}
          />,
        );

        onload();

        expect(screen.getByRole('img', { name: 'A dog' })).toHaveAttribute(
          'src',
          'https://placedog.net/401',
        );

        expect(screen.getByText('A')).toBeVisible();
      });
    });
  });
});
