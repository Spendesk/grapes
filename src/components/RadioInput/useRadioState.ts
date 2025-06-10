import { useContext } from 'react';
import { RadioGroupContext } from '../RadioGroup/RadioGroup';
import type { RadioInputProps } from './RadioInput';

export function useRadioState(props: RadioInputProps) {
  const radioGroupContext = useContext(RadioGroupContext);

  if (radioGroupContext === null) {
    return props;
  }

  return {
    ...props,
    isChecked: props.value === radioGroupContext.value,
    name: radioGroupContext.name,
    onChange: radioGroupContext.onChange,
  };
}
