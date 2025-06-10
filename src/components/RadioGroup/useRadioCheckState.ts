import { useContext } from 'react';
import { RadioGroupContext } from './RadioGroup';

export function useRadioCheckState(
  value: string | boolean,
  isChecked: boolean,
) {
  const radioGroupContext = useContext(RadioGroupContext);

  if (radioGroupContext === null) {
    return isChecked;
  }

  return radioGroupContext.value === value;
}
