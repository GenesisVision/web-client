export const ACTIVE = "asset";

export const ACTIVE_ROUTE = `/${ACTIVE}`;

export const getActiveUrl = (active?: string) => `${ACTIVE_ROUTE}/${active}`;
