import type { Role, RouteKey } from "../data/school";
import { navItems } from "../data/school";

export function routesForRole(role: Role) {
  return navItems.filter((item) => item.roles.includes(role));
}

export function isRouteAllowed(role: Role, route: RouteKey) {
  return routesForRole(role).some((item) => item.key === route);
}

export function firstRouteForRole(role: Role): RouteKey {
  return routesForRole(role)[0]?.key ?? "overview";
}
