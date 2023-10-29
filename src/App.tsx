import { nanoid } from 'nanoid';
import { ChangeEventHandler, FC, FormEventHandler, Key, useEffect, useMemo, useRef, useState } from 'react';

import './App.css';
import { useAppDispatch } from './hooks/useAppDispatch';
import { useAppSelector } from './hooks/useAppSelector';
import {
  addService,
  deleteService,
  editService,
  filterServices,
  setIsEditOff,
  setIsEditOn,
} from './redux/actions/servicesAction';
import { ServiceTypes } from './types';

const App: FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [value, setValue] = useState('');

  const dispatch = useAppDispatch();
  const { serviceList, isEdit, filteredServiceList } = useAppSelector((state) => state.services);

  const onChangeFilter: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.currentTarget.value);
  };

  const onAddService: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const newService: ServiceTypes = {
      key: nanoid(),
      service: e.currentTarget.service.value,
      price: Number(e.currentTarget.price.value),
    };

    dispatch(addService(newService));
    e.currentTarget.reset();
  };

  const onEditService: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const editedService: ServiceTypes = {
      key: e.currentTarget.key.value,
      service: e.currentTarget.service.value,
      price: Number(e.currentTarget.price.value),
    };

    dispatch(editService(editedService));
    dispatch(setIsEditOff());
    e.currentTarget.reset();
  };

  const onSelectService = (service: ServiceTypes) => () => {
    const formElements = formRef.current?.elements as { [k: string]: HTMLInputElement } | undefined;
    for (const idx in formElements) {
      if (formElements[idx].tagName === 'INPUT') {
        formElements[idx].value = String(service[formElements[idx].name as keyof ServiceTypes]);
      }
    }
    dispatch(setIsEditOn());
  };

  const onDeleteService = (key: Key) => () => {
    dispatch(deleteService(key));
    onUnselectService();
  };

  const onUnselectService = () => {
    formRef.current?.reset();
    dispatch(setIsEditOff());
  };

  const handleSubmit = useMemo(() => {
    return isEdit ? onEditService : onAddService;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit]);

  useEffect(() => {
    serviceList.length && dispatch(filterServices(value));
  }, [serviceList, value, dispatch]);

  return (
    <div className="app">
      <input onChange={onChangeFilter} value={value} type="text" className='input__filter'/> ----Фильтрация
      <form className="app-form" onSubmit={handleSubmit} ref={formRef}>
        <input name="key" type="text" hidden />
        <input name="service" type="text" />
        <input name="price" type="text" />
        <button>Save</button>
        {isEdit && (
          <button onClick={onUnselectService} type="button">
            Cancel
          </button>
        )}
      </form>
      <ul className="app-list">
        {filteredServiceList.map((item) => (
          <li key={item.key}>
            {item.service} {item.price}
            <button onClick={onSelectService(item)} type="button">
              ✎
            </button>
            <button onClick={onDeleteService(item.key)} type="button">
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;