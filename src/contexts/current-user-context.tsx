import { createContext } from 'react';
import { CurrentUserIF } from '../interfaces/current-user-interface';

export const CurrentUserContext = createContext<CurrentUserIF | undefined>(undefined);
