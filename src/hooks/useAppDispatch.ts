import { useDispatch } from 'react-redux';

import { AppDispatchTypes } from '../redux';

export const useAppDispatch = () => useDispatch<AppDispatchTypes>();
