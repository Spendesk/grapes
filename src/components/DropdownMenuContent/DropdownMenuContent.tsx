import React, {
  type HTMLProps,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { GetPropsCommonOptions, GetMenuPropsOptions } from 'downshift';

import { DropdownMenuContentList } from './DropdownMenuContentList';
import { classNames, getStyleFromPlacement, type Placement } from '../../utils';

import usePrevious from '../../hooks/usePrevious';
import { useFormFieldContext } from '../FormField/FormFieldContext';

import styles from './DropdownMenuContent.module.css';
import commonStyles from '../../theme/common.module.css';

type OptionGroup<T> = { key: string; label: string; options: T[] };

type Option = { key: string; label: string };

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

export type Props<T extends Option> = {
  className?: string;
  isOpen?: boolean;
  isLoading?: boolean;
  placement?: Placement;
  maxHeight?: string;
  options: (T | OptionGroup<T>)[];
  renderSearchBar?: () => ReactNode;
  getItemProps(options: { item: T; index: number }): HTMLProps<HTMLLIElement>;
  getMenuProps(
    options?: GetMenuPropsOptions,
    otherOptions?: GetPropsCommonOptions,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Overwrite<HTMLProps<HTMLUListElement>, { ref?: any }>;
  renderOption(option: T, index: number): ReactNode; // should always return a DropdownItem component
  renderOptionGroup?(optionGroup: OptionGroup<T>): ReactNode;
  renderNoOptions?(): ReactNode;
  renderLoadingOptions?(): ReactNode;
};

export const DropdownMenuContent = <T extends Option>({
  className,
  isOpen = true,
  isLoading = false,
  maxHeight,
  options,
  placement = 'bottom-start',
  getItemProps,
  getMenuProps,
  renderOption,
  renderOptionGroup,
  renderNoOptions,
  renderLoadingOptions,
  renderSearchBar,
}: Props<T>) => {
  const [visible, setVisible] = useState(isOpen);
  const refTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const previousOpenState = usePrevious(isOpen);

  const context = useFormFieldContext();

  useEffect(() => {
    if (isOpen) {
      clearTimeout(refTimeout.current);
      setVisible(isOpen);
    } else if (previousOpenState) {
      refTimeout.current = setTimeout(() => {
        if (!isOpen) {
          setVisible(false);
        }
      }, 200);
    }
  }, [isOpen, previousOpenState]);

  useEffect(() => {
    return () => clearTimeout(refTimeout.current);
  }, []);

  return (
    <ul
      {...getMenuProps({
        'aria-labelledby': context.labelId,
      })}
      className={classNames(
        isOpen && styles.enter,
        commonStyles.dropdownContent,
        styles.dropdownMenuContentWrapper,
        className,
      )}
      style={{ maxHeight, ...getStyleFromPlacement(placement) }}
      aria-busy={isLoading ? 'true' : 'false'}
      data-placement={placement}
      onTransitionEnd={() => {
        if (!isOpen) {
          setVisible(false);
        }
      }}
    >
      {visible ? (
        <>
          {renderSearchBar && renderSearchBar()}
          <DropdownMenuContentList
            options={options}
            getItemProps={getItemProps}
            renderOption={renderOption}
            renderOptionGroup={renderOptionGroup}
            renderNoOptions={renderNoOptions}
            renderLoadingOptions={renderLoadingOptions}
            isLoading={isLoading}
          />
        </>
      ) : null}
    </ul>
  );
};
