import React from 'react';
import { useGetOptionId } from './ListBoxProvider';
import { Option } from './Option';

export type OptionsProps<T extends object> = {
  options: T[];
};

export function Options<T extends object>({ options }: OptionsProps<T>) {
  const getOptionId = useGetOptionId();

  return (
    <>
      {options.map((option) => {
        const id = getOptionId(option);
        return <Option key={id} option={option} />;
      })}
    </>
  );
}
