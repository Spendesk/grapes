import React, {
  type ReactElement,
  type MouseEventHandler,
  Fragment,
} from 'react';

import { ModalContent } from '../Modal/ModalContent';
import { ModalOverlay } from '../Modal/ModalOverlay';
import type { DeprecatedModalSlideshowSlide } from './types';
import {
  DeprecatedModalSlideshowBody,
  type DeprecatedModalSlideshowBodyProps,
} from './DeprecatedModalSlideshowBody';

import styles from './DeprecatedModalSlideShowBody.module.css';

export type DeprecatedModalSlideshowProps = Omit<
  DeprecatedModalSlideshowBodyProps,
  'titleId'
> & {
  /**
   * Whether the ModalSlideshow should have opening and closing animation.
   */
  noAnimation?: boolean;
  /**
   * Whether the ModalSlideshow should be open.
   */
  isOpen: boolean;
  /**
   * Handler that is called when the ModalSlideshow is closed.
   */
  onClose: MouseEventHandler<HTMLElement>;
  /**
   * The element where to mount the Modal. It needs to be outside the GrapesProvider tree for the focus trap to work properly.
   * @default document.body
   */
  portalContainer?: Element;
};

/**
 * @deprecated use ModalSlideshow instead
 */
export const DeprecatedModalSlideshow = ({
  slides,
  noAnimation,
  isOpen,
  onClose,
  portalContainer,
  ...bodyProps
}: DeprecatedModalSlideshowProps): ReactElement | null => {
  const preloadImages = () => {
    const render = (slide: DeprecatedModalSlideshowSlide | undefined) =>
      slide && <Fragment key={slide.title}>{slide.illustration}</Fragment>;
    return isOpen ? slides.map(render) : render(slides[0]);
  };

  return (
    <ModalOverlay
      isOpen={isOpen}
      noAnimation={noAnimation}
      portalContainer={portalContainer}
    >
      <div hidden>{preloadImages()}</div>
      <ModalContent
        aria-label="carousel"
        onClose={onClose}
        className={styles.overflowHidden}
      >
        <DeprecatedModalSlideshowBody slides={slides} {...bodyProps} />
      </ModalContent>
    </ModalOverlay>
  );
};
