import { ServiceTypes } from '../../types';
import {
  ADD_SERVICE,
  DELETE_SERVICE,
  EDIT_SERVICE,
  FILTER_SERVICES,
  SET_IS_EDIT_OFF,
  SET_IS_EDIT_ON,
  ServicesActionTypes,
} from '../actions/servicesAction';

type ServicesStateTypes = {
  serviceList: ServiceTypes[];
  isEdit: boolean;
  filteredServiceList: ServiceTypes[];
};

const initialState: ServicesStateTypes = {
  serviceList: [],
  isEdit: false,
  filteredServiceList: [],
};

export const servicesReducer = (state = initialState, action: ServicesActionTypes): ServicesStateTypes => {
  switch (action.type) {
    case ADD_SERVICE: {
      const serviceList = [...state.serviceList, action.payload];
      return { ...state, serviceList };
    }
    case SET_IS_EDIT_ON: {
      return { ...state, isEdit: true };
    }
    case SET_IS_EDIT_OFF: {
      return { ...state, isEdit: false };
    }
    case EDIT_SERVICE: {
      const serviceList = state.serviceList.map((service) => {
        return service.key === action.payload.key ? action.payload : service;
      });
      return { ...state, serviceList };
    }
    case DELETE_SERVICE: {
      const serviceList = state.serviceList.filter((service) => service.key !== action.payload);
      return { ...state, serviceList };
    }
    case FILTER_SERVICES: {
      const filteredServiceList = action.payload
        ? state.serviceList.filter(({ service }) => service.startsWith(action.payload))
        : state.serviceList;
      return { ...state, filteredServiceList };
    }
    default:
      return state;
  }
};