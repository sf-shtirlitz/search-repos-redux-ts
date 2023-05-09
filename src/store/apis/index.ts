import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { repositoriesApi } from './repositoriesApi';
 
export const store = configureStore({
  reducer: {
    [repositoriesApi.reducerPath]: repositoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(repositoriesApi.middleware);
  },
});
 
setupListeners(store.dispatch);    
export {
  useFetchRepositoriesQuery,
} from './repositoriesApi';