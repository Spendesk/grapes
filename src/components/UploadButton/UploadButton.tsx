import React, { useRef, useState } from 'react';

import { Button, type ButtonVariant } from '../Button';
import type { IconName } from '../Icon';

import styles from './UploadButton.module.css';

export type UploadButtonProps = {
  /**
   * One or more unique file type specifiers describing file types to allow.
   * Cf https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#unique_file_type_specifiers
   */
  accept?: string;
  /**
   * aria-label for the input.
   */
  ariaLabel?: string;
  /**
   * className for the element.
   */
  className?: string;
  /**
   * Specifies the width of the element.
   */
  fit?: 'content' | 'parent';
  /**
   * Whether the button should have no horizontal padding. Has effect only on tertiary variant
   * @default false
   */
  hasNoHorizontalPadding?: boolean;
  /**
   * Whether the button should be disabled.
   */
  isDisabled?: boolean;
  /**
   * Be able to select more than one file.
   * @default false
   */
  isMultiple?: boolean;
  /**
   * The text to display in the button.
   */
  text: string;
  /**
   * The visual style of the button
   * @default primaryBrand
   */
  variant?: ButtonVariant;
  /**
   * Handler that is called when a file is submitted.
   */
  onUpload(files: FileList | null): void | Promise<void>;
  /**
   * The icon to display in the button.
   */
  iconName?: IconName;
  /**
   * Specifies where the icon is positioned.
   */
  iconPosition?: 'left' | 'right';
};

export const UploadButton = ({
  accept = '',
  ariaLabel,
  className,
  fit,
  hasNoHorizontalPadding,
  isDisabled,
  isMultiple = false,
  text,
  variant = 'primaryBrand',
  onUpload,
  ...rest
}: UploadButtonProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <Button
        className={className}
        fit={fit}
        isDisabled={isDisabled}
        isLoading={isLoading}
        hasNoHorizontalPadding={hasNoHorizontalPadding}
        variant={variant}
        onClick={() => {
          if (inputRef?.current) {
            inputRef.current.click();
          }
        }}
        text={text}
        {...rest}
      />
      <input
        accept={accept}
        aria-label={ariaLabel}
        className={styles.uploadButtonInput}
        disabled={isDisabled || isLoading}
        ref={inputRef}
        type="file"
        multiple={isMultiple}
        onChange={async (event) => {
          const { files } = event.target;
          setIsLoading(true);
          try {
            await onUpload(files);
          } finally {
            setIsLoading(false);
          }
        }}
        placeholder="File input"
      />
    </>
  );
};
