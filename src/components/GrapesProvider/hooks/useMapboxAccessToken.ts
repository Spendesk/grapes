import { useContext } from 'react';
import { GrapesContext } from '../GrapesContext';

export const useMapboxAccessToken = (): string | undefined => {
  return useContext(GrapesContext).mapboxAccessToken;
};
