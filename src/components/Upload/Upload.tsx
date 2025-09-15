import React, { type ReactNode } from 'react';
import { classNames } from '../../utils';

import { Icon } from '../Icon';

import styles from './Upload.module.scss';
import commonStyles from '../../theme/placeholders/common.module.css';

export type UploadType = 'drag_and_drop' | 'selection';

export type UploadProps = {
  /**
   * The contents of the Upload
   */
  content: ReactNode;
  /**
   * The contents of the Upload on drag
   */
  activeDragContent: ReactNode;
  /**
   * Handler that is called when a file is submitted
   */
  onUpload(files: File[], uploadType: UploadType): void | Promise<void>;
  /**
   * Illustration to use instead of the default icon
   */
  illustration?: ReactNode;
  /**
   * Whether the input should allow multiple file
   * @default false
   */
  multiple?: boolean;
  /**
   * Whether the Upload is invalid.
   * @default false
   */
  isInvalid?: boolean;
  /**
   * className for the element
   */
  className?: string;
  /**
   * One or more unique file type specifiers describing file types to allow.
   * Cf https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#unique_file_type_specifiers
   */
  accept?: string;
};

export const Upload = ({
  className,
  content,
  activeDragContent,
  onUpload,
  illustration,
  multiple = false,
  isInvalid = false,
  accept = '',
  ...rest
}: UploadProps) => {
  const targetCountRef = React.useRef<number>(0);
  const [isDragActive, setDragActive] = React.useState(false);

  const handleDragLeave = React.useCallback(
    (event: React.DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      event.stopPropagation();
      if (--targetCountRef.current > 0) {
        return;
      }
      setDragActive(false);
    },
    [],
  );

  const handleDragEnter = React.useCallback(
    (event: React.DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      setDragActive(true);
      targetCountRef.current++;
    },
    [],
  );

  const handleDragOver = React.useCallback(
    (event: React.DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      if (event.dataTransfer) {
        try {
          event.dataTransfer.dropEffect = 'copy';
        } catch {} /* eslint-disable-line no-empty */
      }
    },
    [],
  );

  /**
   * Given a FileList, calls onUpload with a file Array.
   * If multiple props is false, only the first file is given to onUpload
   */
  const handleUpload = (files: FileList, uploadType: UploadType) => {
    const filesArray = Array.from(files).filter((_, index) =>
      multiple ? true : index < 1,
    );
    onUpload(filesArray, uploadType);
    setDragActive(false);
    targetCountRef.current = 0;
  };

  return (
    <label
      className={classNames(
        styles.upload,
        isDragActive && styles.activeUpload,
        isInvalid && styles.isInvalid,
        className,
      )}
      onDrop={(event) => {
        event.preventDefault();

        const { files } = event.dataTransfer;
        handleUpload(files, 'drag_and_drop');
      }}
      onDragLeave={handleDragLeave}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      aria-dropeffect="copy"
    >
      <input
        {...rest}
        className={commonStyles.visuallyHidden}
        type="file"
        aria-invalid={isInvalid ? 'true' : 'false'}
        multiple={multiple}
        accept={accept}
        onChange={(event) => {
          const { files } = event.target;
          if (files) {
            handleUpload(files, 'selection');
          }
        }}
      />
      {illustration || (
        <Icon
          className={styles.uploadIcon}
          name="mouse-square-stack"
          size="l"
          aria-hidden="true"
        />
      )}
      <div>{isDragActive ? activeDragContent : content}</div>
    </label>
  );
};
