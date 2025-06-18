import React, {
  type ReactElement,
  type ReactNode,
  useEffect,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useSetInert } from '../GrapesProvider/hooks/useInert';

import styles from './Modal.module.css';
import { classNames, supportInert } from '../../utils';

export type ModalOverlayProps = {
  /**
   * Whether the modal should be open
   */
  isOpen: boolean;
  /**
   * Whether the modal should have opening and closing animation
   * @default false
   */
  noAnimation?: boolean;
  /**
   * The element where to mount the Modal. It needs to be outside the GrapesProvider tree for the focus trap to work properly.
   * @default document.body
   */
  portalContainer?: Element;
  /**
   * The content of the ModalOverlay
   */
  children?: ReactNode;
  /**
   * className for the element
   */
  className?: string;
  /**
   * Time to wait before removing the element on exit.
   * Used only when onAnimationEnd is not supported
   * @default 200ms
   */
  timeout?: number;
};

/**
 * The dimmed overlay behind the modal dialog
 * @see https://grapes.spendesk.design/docs/components/modal
 */
export const ModalOverlay = ({
  children,
  isOpen,
  portalContainer,
  noAnimation = false,
  className,
  timeout = 200,
  ...rest
}: ModalOverlayProps): ReactElement | null => {
  const setInert = useSetInert();
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    if (setInert) {
      setInert(isOpen);
    }
    return () => {
      if (setInert) {
        setInert(false);
      }
    };
  }, [isOpen, setInert]);

  useEffect(() => {
    let timeoutId = undefined;
    if (isOpen) {
      setIsVisible(true);
    } else {
      timeoutId = setTimeout(
        () => {
          setIsVisible(false);
        },
        noAnimation ? 0 : timeout,
      );
    }

    return () => {
      clearInterval(timeoutId);
    };
  }, [isOpen, noAnimation, timeout]);

  if (typeof document === 'undefined') {
    return null;
  }

  const modalContainer = isVisible ? (
    <div
      {...rest}
      className={styles.modalContainer}
      /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
      /* @ts-ignore Typescript and React doesn't play nice with inert https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert*/
      inert={supportInert(!isOpen)}
    >
      <div
        className={classNames(styles.modalOverlay, className)}
        data-closing={isOpen === false}
        onAnimationEnd={(e) => {
          if (e.animationName === styles.opacityout) {
            setIsVisible(false);
          }
        }}
      >
        {children}
      </div>
    </div>
  ) : null;

  return createPortal(modalContainer, portalContainer ?? document.body);
};
