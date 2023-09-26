import type {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from "@reduxjs/toolkit";
import type { AxiosInstance } from "axios";

// import type { UserSchema } from '~/entities/User';
// import type { LoginSchema } from '~/features/AuthByEmail';
// import type { RegisterSchema } from '~/features/Register';
// import type { UISchema } from '~/features/UI';
// import { rtkApi } from '~/shared/api/rtkApi';

export interface StateSchema {
  // user: UserSchema;
  // ui: UISchema;
  // [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
  //
  // //  Асинхронные редюсеры
  // loginForm?: LoginSchema;
  // registrationForm?: RegisterSchema;
}

export type StateSchemaKey = keyof StateSchema;
// eslint-disable-next-line no-undef
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
  //  true - вмонтирован, false - демонтирован
  getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}
