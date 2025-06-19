import React from 'react';

import type { AmountInputCurrency } from '../currency';
import { SelectAddon } from '../../SelectAddon';

import styles from './CurrencySelect.module.scss';
import { useTranslate } from '../../../hooks/useTranslate';

type Props = {
  options: AmountInputCurrency[];
  value: AmountInputCurrency;
  isDisabled?: boolean;
  onSelect: (selectedCurrency: AmountInputCurrency) => void;
};

export const CurrencySelect = ({
  options,
  value,
  isDisabled = false,
  onSelect,
}: Props) => {
  const t = useTranslate();
  return (
    <SelectAddon
      options={options}
      value={value}
      isDisabled={isDisabled}
      position="right"
      onSelect={onSelect}
      renderSelectedItem={(selectedItem) => (
        <span className={styles.currencyValue}>{selectedItem.key}</span>
      )}
      aria-label={t('selectCurrency')}
    />
  );
};
