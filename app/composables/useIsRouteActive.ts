import type { RouteLocationNamedRaw } from "vue-router";

export const useIsRouteActive = (to: RouteLocationNamedRaw) => {
  const route = useRoute();
  return route.name?.toString().startsWith(to.name?.toString() ?? "");
};
