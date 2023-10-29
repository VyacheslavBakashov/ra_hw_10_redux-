import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { AppStateTypes } from '../redux';

export const useAppSelector: TypedUseSelectorHook<AppStateTypes> = useSelector;
