import { useContext } from 'react';
import { GrapesContext } from '../GrapesContext';

export const useLocale = (): string => {
  return useContext(GrapesContext).locale;
};
