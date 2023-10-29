import { Key } from 'react';

import { ServiceTypes } from './../../types/index';

export const ADD_SERVICE = 'ADD_SERVICE';
export const SET_IS_EDIT_ON = 'SET_IS_EDIT_ON';
export const SET_IS_EDIT_OFF = 'SET_IS_EDIT_OFF';
export const EDIT_SERVICE = 'EDIT_SERVICE';
export const DELETE_SERVICE = 'DELETE_SERVICE';
export const FILTER_SERVICES = 'FILTER_SERVICES';

export const setIsEditOn = () =>
  ({
    type: SET_IS_EDIT_ON,
  } as const);

export const setIsEditOff = () =>
  ({
    type: SET_IS_EDIT_OFF,
  } as const);

export const addService = (service: ServiceTypes) =>
  ({
    type: ADD_SERVICE,
    payload: service,
  } as const);

export const editService = (service: ServiceTypes) =>
  ({
    type: EDIT_SERVICE,
    payload: service,
  } as const);

export const deleteService = (key: Key) =>
  ({
    type: DELETE_SERVICE,
    payload: key,
  } as const);

export const filterServices = (value: string) =>
  ({
    type: FILTER_SERVICES,
    payload: value,
  } as const);

export type ServicesActionTypes =
  | ReturnType<typeof addService>
  | ReturnType<typeof setIsEditOn>
  | ReturnType<typeof setIsEditOff>
  | ReturnType<typeof editService>
  | ReturnType<typeof deleteService>
  | ReturnType<typeof filterServices>;
  