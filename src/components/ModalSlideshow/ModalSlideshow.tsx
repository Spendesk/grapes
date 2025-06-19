import React, {
  type ReactElement,
  type MouseEventHandler,
  Fragment,
  useState,
} from 'react';

import { ModalBody, ModalOverlay } from '../Modal';
import type { ModalSlideshowSlide } from './types';

import styles from './ModalSlideshow.module.scss';
import { IconButton } from '../IconButton';
import { useTranslate } from '../../hooks/useTranslate';
import { useId } from '../../hooks/useId';
import { Button } from '../Button';
import { Dots } from '../Dots';

export type ModalSlideshowProps = {
  /**
   * The slides to display in the ModalSlideshow.
   */
  slides: ModalSlideshowSlide[];
  /**
   * Whether the ModalSlideshow should have opening and closing animation.
   */
  noAnimation?: boolean;
  /**
   * Whether the ModalSlideshow should be open.
   */
  isOpen: boolean;
  /**
   * Handler that is called to cancel the slideshow.
   */
  onCancel: MouseEventHandler<HTMLElement>;
  /**
   * Handler that is called when the ModalSlideshow is closed.
   */
  onClose: ({
    event,
    index,
  }: {
    event: React.MouseEvent<HTMLElement>;
    index: number;
  }) => void;
  /**
   * Handler that is called after the last slide has been displayed.
   */
  onDone: MouseEventHandler<HTMLElement>;
  /**
   * The element where to mount the Modal. It needs to be outside the GrapesProvider tree for the focus trap to work properly.
   * @default document.body
   */
  portalContainer?: Element;
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

export const ModalSlideshow = ({
  slides,
  noAnimation,
  isOpen,
  onCancel,
  onClose,
  onDone,
  portalContainer,
  translations,
}: ModalSlideshowProps): ReactElement | null => {
  const t = useTranslate();

  const preloadImages = () => {
    const render = (slide: ModalSlideshowSlide | undefined) =>
      slide && <Fragment key={slide.title}>{slide.illustration}</Fragment>;
    return isOpen ? slides.map(render) : render(slides[0]);
  };

  const prefixId = useId();
  const [currentIndex, setCurrentIndex] = useState(0);

  const isFirstItem = currentIndex === 0;
  const isLastItem = slides.length - 1 === currentIndex;

  return (
    <ModalOverlay
      isOpen={isOpen}
      noAnimation={noAnimation}
      portalContainer={portalContainer}
    >
      <div hidden>{preloadImages()}</div>
      <div
        aria-label="carousel"
        className={styles.modal}
        role="dialog"
        aria-modal="true"
      >
        <IconButton
          className={styles.modalCloseButton}
          iconName="cross"
          onClick={(event) => {
            onClose({ event, index: currentIndex });
            setCurrentIndex(0);
          }}
          aria-label={t('close')}
        />
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
              <ModalBody>
                <div className={styles.leftSide}>
                  <div className={styles.content}>
                    <h1 className={styles.title} id={`${prefixId}${index}`}>
                      {slide.title}
                    </h1>
                    {slide.content}
                  </div>
                  <footer className={styles.contentFooter}>
                    <Button
                      iconName={isFirstItem ? undefined : 'chevron-left'}
                      iconPosition="left"
                      variant="secondaryNeutral"
                      onClick={(event) => {
                        if (isFirstItem) {
                          onCancel(event);
                          setCurrentIndex(0);
                        } else {
                          setCurrentIndex((index) => index - 1);
                        }
                      }}
                      text={
                        isFirstItem
                          ? translations.cancel
                          : translations.previous
                      }
                    />
                    {slides.length > 1 && (
                      <Dots
                        length={slides.length}
                        activeDotIndex={currentIndex}
                      />
                    )}
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
                  </footer>
                </div>
              </ModalBody>
              {currentIndex === index && (
                <div className={styles.modalIllustration}>
                  {slide.illustration}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </ModalOverlay>
  );
};
