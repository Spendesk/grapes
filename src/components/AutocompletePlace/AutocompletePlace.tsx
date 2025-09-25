import React, { type ReactNode, useEffect, useState } from 'react';

import { useDebounce } from '../../hooks/useDebounce';
import {
  Autocomplete,
  type AutocompleteProps,
} from '../Autocomplete/Autocomplete';
import type { ComboboxOption } from '../Combobox';
import { useLocale, useMapboxAccessToken } from '../GrapesProvider';
import { getMatchingPlaces, type MapboxPlace } from './mapbox';

export type AutocompletePlaceProps<T extends ComboboxOption> = Omit<
  AutocompleteProps<T>,
  | 'options'
  | 'onSelect'
  | 'onSearch'
  | 'onAddOption'
  | 'renderAddOption'
  | 'renderNoOptions'
  | 'value'
> & {
  /**
   * Restricts the search to a specific country.
   */
  country?: string;
  /**
   * Bias results around a specific  country.
   */
  proximityCountry?: string;
  /**
   * The current value (controlled).
   */
  value?: string;
  /**
   * Handler that is called when an option is selected.
   */
  handleSelect: (value: MapboxPlace | undefined) => void;
  /**
   * The content to display when no options are available.
   */
  renderNoOptions: (
    value: string,
    debouncedSearchValue: string | undefined,
  ) => ReactNode;
};

const MIN_TEXT_SEARCH_LENGTH = 3;

export const AutocompletePlace = <T extends ComboboxOption>({
  handleSelect,
  renderNoOptions,
  country,
  proximityCountry,
  value,
  ...rest
}: AutocompletePlaceProps<T>) => {
  const [mapPlaces, setMapPlaces] = useState<MapboxPlace[] | undefined>();
  const [options, setOptions] = useState<T[] | undefined>();
  const [searchValue, setSearchValue] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const mapboxAccessToken = useMapboxAccessToken();
  const locale = useLocale();

  const debouncedSearchValue = useDebounce<string | undefined>(
    searchValue,
    300,
  );

  useEffect(() => {
    async function handleSearch() {
      if (debouncedSearchValue && mapboxAccessToken) {
        setIsLoading(true);
        try {
          const filteredOptions = await getMatchingPlaces(
            mapboxAccessToken,
            locale,
            debouncedSearchValue,
            country,
            proximityCountry,
          );
          setMapPlaces(filteredOptions);
          if (filteredOptions) {
            setOptions(
              filteredOptions.map(
                (option) =>
                  ({
                    key: option.id,
                    label: option.place_name,
                  }) as T,
              ),
            );
          }
        } catch (error) {
          console.error(error);
          setOptions([]);
        } finally {
          setIsLoading(false);
        }
      }
    }

    handleSearch();
  }, [
    debouncedSearchValue,
    locale,
    mapboxAccessToken,
    country,
    proximityCountry,
  ]);

  return (
    <Autocomplete
      {...rest}
      value={
        value
          ? {
              key: value,
              label: value,
            }
          : undefined
      }
      options={options || []}
      isLoading={isLoading}
      showClearSelectionButton
      isAutocompletePlace
      onSearch={(value) => {
        if (
          !mapboxAccessToken ||
          value === undefined ||
          value.length < MIN_TEXT_SEARCH_LENGTH
        ) {
          setSearchValue(undefined);
          setOptions(undefined);
          return;
        }

        setSearchValue(value);
      }}
      onSelect={(option) => {
        const mapPlace = mapPlaces?.find(
          (mapPlace) => mapPlace.id === option?.key,
        );
        if (!mapPlace) {
          handleSelect(undefined);
        } else {
          handleSelect(mapPlace);
        }
      }}
      renderNoOptions={(rawValue) => {
        return renderNoOptions(rawValue, debouncedSearchValue);
      }}
    />
  );
};
