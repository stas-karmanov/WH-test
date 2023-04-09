import { useCallback, useContext } from 'react';

import { RouterContext } from '../Router';

export const useNavigate = () => {
  const { setActivePage } = useContext(RouterContext);
  return useCallback((page: string) => setActivePage(page), [setActivePage]);
};
