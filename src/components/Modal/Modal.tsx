import React, { MouseEventHandler, ReactElement, ReactNode } from 'react';

import { IconName } from '../Icon/Icon';
import { useId } from '../../hooks/useId';

import { ModalOverlay } from './ModalOverlay';
import { ModalContent } from './ModalContent';
import {
  ModalHeaderWithIcon,
  type ModalHeaderWithIconVariant,
} from './ModalHeaderWithIcon';
import { ModalHeaderWithIllustration } from './ModalHeaderWithIllustration';
import { ModalFooter } from './ModalFooter';
import { ModalBody } from './ModalBody';

export type ModalProps = {
  /**
   * Actions to display in the Modal
   */
  actions?: ReactNode;
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
   * The element where to mount the Modal. It needs to be outside
   * the GrapesProvider tree for the focus trap to work properly.
   * @default document.body
   */
  portalContainer?: Element;
  /**
   * The title of the Modal
   */
  title: string;
  /**
   * The subtitle of the Modal
   */
  subtitle?: string;
  /**
   * The content of the Modal
   */
  children?: ReactNode;
  /**
   * className for the element
   */
  className?: string;
  /**
   * Handler that is called when the Modal is closed
   */
  onClose?: MouseEventHandler<HTMLButtonElement>;
} & (
  | // Modal with icon
  {
      /**
       * The icon to display in the button
       */
      iconName: IconName;
      /**
       * Specifies the icon variant
       * @default info
       */
      iconVariant?: ModalHeaderWithIconVariant;
      illustration?: never;
      illustrationHeight?: never;
    }
  // Modal with illustration
  | {
      iconName?: never;
      iconVariant?: never;
      /**
       * The illustration to display on top of the Modal
       */
      illustration: ReactNode;
      /**
       * Specifies the illustration height
       * @default 424px
       */
      illustrationHeight?: string;
    }
);

/**
 * A Modal is window containing contextual information, tasks, or workflows that appear over the user interface.
 * The content behind a modal dialog is inert, meaning that users cannot interact with it.
 * @see https://grapes.spendesk.design/docs/components/modal
 */
export const Modal = ({
  actions,
  children,
  iconName,
  iconVariant = 'info',
  illustration,
  illustrationHeight = '424px',
  isOpen,
  portalContainer,
  title,
  subtitle,
  className,
  onClose,
  noAnimation = false,
  ...rest
}: ModalProps): ReactElement | null => {
  const labelledById = useId();
  const hasIcon = iconName != null;
  return (
    <ModalOverlay
      isOpen={isOpen}
      noAnimation={noAnimation}
      portalContainer={portalContainer}
    >
      <ModalContent
        aria-labelledby={labelledById}
        onClose={onClose}
        className={className}
        {...rest}
      >
        {hasIcon ? (
          <ModalHeaderWithIcon
            title={title}
            subtitle={subtitle}
            iconName={iconName}
            iconVariant={iconVariant}
            titleId={labelledById}
          />
        ) : (
          <ModalHeaderWithIllustration
            title={title}
            subtitle={subtitle}
            illustration={illustration}
            illustrationHeight={illustrationHeight}
            titleId={labelledById}
          />
        )}
        {children ? <ModalBody>{children}</ModalBody> : null}
        {actions ? <ModalFooter>{actions}</ModalFooter> : null}
      </ModalContent>
    </ModalOverlay>
  );
};
