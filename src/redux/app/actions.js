import TYPES from './types';

export const loading = (isLoading) => ({
  payload: {
    isLoading
  },
  type: TYPES.LOADING
});

export const start = () => ({
  type: TYPES.START
});

export const login = (user) => ({
  payload: {
    user
  },
  type: TYPES.LOGIN
});

export const logout = (user) => ({
  payload: {
    user
  },
  type: TYPES.LOGOUT
});

export const setError = ({field, error}) => ({
  payload: {
    field,
    error
  },
  type: TYPES.SET_ERROR
});

export const resetError = ({field}) => ({
  payload: {
    field
  },
  type: TYPES.RESET_ERROR
});
