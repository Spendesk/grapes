import React, { MouseEventHandler, useState } from 'react';

import { Button } from '../Button';
import { Dots } from '../Dots';
import { ModalBody } from '../Modal/ModalBody';
import { ModalHeaderWithIllustration } from '../Modal/ModalHeaderWithIllustration';
import { ModalFooter } from '../Modal/ModalFooter';
import { DeprecatedModalSlideshowSlide } from './types';
import { useId } from '../../hooks/useId';

import styles from './DeprecatedModalSlideShowBody.module.scss';

export type DeprecatedModalSlideshowBodyProps = {
  /**
   * The slides to display in the ModalSlideshow.
   */
  slides: DeprecatedModalSlideshowSlide[];
  /**
   * Handler that is called after the last slide has been displayed.
   */
  onDone: MouseEventHandler<HTMLElement>;
  /**
   * Handler that is called to cancel the slideshow.
   */
  onCancel: MouseEventHandler<HTMLElement>;
  /**
   * The translations for the buttons.
   */
  translations: {
    cancel: string;
    previous: string;
    next: string;
    done: string;
  };
};

export const DeprecatedModalSlideshowBody = ({
  slides,
  translations,
  onCancel,
  onDone,
}: DeprecatedModalSlideshowBodyProps) => {
  const prefixId = useId();
  const [currentIndex, setCurrentIndex] = useState(0);

  const isFirstItem = currentIndex === 0;
  const isLastItem = slides.length - 1 === currentIndex;

  return (
    <>
      <div
        className={styles.grid}
        role="group"
        aria-roledescription="carousel"
        style={{ ['--_slide' as string]: currentIndex }}
      >
        {slides.map((slide, index) => (
          <div
            key={`${slide.title}${index}`}
            className={styles.subgrid}
            aria-hidden={index !== currentIndex}
            role="group"
            aria-roledescription="slide"
            aria-labelledby={`${prefixId}${index}`}
          >
            <ModalHeaderWithIllustration
              title={slide.title}
              titleId={`${prefixId}${index}`}
              illustration={slide.illustration}
              illustrationHeight={slide.illustrationHeight}
            />
            <ModalBody>
              <span>{slide.content}</span>
            </ModalBody>
          </div>
        ))}
      </div>
      <Dots length={slides.length} activeDotIndex={currentIndex} />
      <ModalFooter>
        <Button
          iconName={isFirstItem ? undefined : 'chevron-left'}
          iconPosition="left"
          variant="secondaryNeutral"
          onClick={(event) => {
            if (isFirstItem) {
              onCancel(event);
            } else {
              setCurrentIndex((index) => index - 1);
            }
          }}
          text={isFirstItem ? translations.cancel : translations.previous}
        />
        <Button
          iconName={isLastItem ? undefined : 'chevron-right'}
          text={isLastItem ? translations.done : translations.next}
          iconPosition="right"
          variant="primaryBrand"
          onClick={(event) => {
            if (isLastItem) {
              onDone(event);
            } else {
              setCurrentIndex((index) => index + 1);
            }
          }}
        />
      </ModalFooter>
    </>
  );
};
