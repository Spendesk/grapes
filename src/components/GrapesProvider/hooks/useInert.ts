import { useContext } from 'react';
import { GrapesContext } from '../GrapesContext';

export const useSetInert = (): ((inert: boolean) => void) | undefined => {
  return useContext(GrapesContext).setInert;
};
