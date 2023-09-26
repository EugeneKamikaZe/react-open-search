import { createReduxStore } from "./config/store";
import { StoreProvider } from "./ui/StoreProvider";

export { createReduxStore, StoreProvider };

export type {
  MountedReducers,
  ReduxStoreWithManager,
  StateSchema,
  StateSchemaKey,
  ThunkConfig,
} from "./config/StateSchema";
export type { AppDispatch } from "./config/store";
