import React from 'react';

import type { Country } from '../country';
import { SelectAddon } from '../../SelectAddon';

import styles from './CountrySelect.module.css';

type Props = {
  options: Country[];
  value: Country;
  isDisabled?: boolean;
  onSelect: (selectedCountry: Country) => void;
};

export const CountrySelect = ({
  options,
  value,
  isDisabled = false,
  onSelect,
}: Props) => {
  return (
    <SelectAddon
      options={options}
      value={value}
      isDisabled={isDisabled}
      position="left"
      onSelect={onSelect}
      renderSelectedItem={(selectedItem) => {
        return (
          <img
            className={styles.countrySelectFlag}
            src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedItem.key}.svg`}
            alt={`${selectedItem.key}-flag`}
          />
        );
      }}
    />
  );
};
