export const getLocation = (state) => state.router.location;
export const getPathname = (state) => getLocation(state)?.pathname;
