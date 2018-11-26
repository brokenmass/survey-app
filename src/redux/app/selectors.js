export const getValues = (state) => state.app.values;
export const getStatus = (state) => state.app.status;
export const getErrors = (state) => state.app.errors;

export const getUser = (state) => getValues(state).user;
export const getUserID = (state) => getUser(state)?.uid;
export const getIsLoading = (state) => getStatus(state).isLoading;
