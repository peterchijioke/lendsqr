export const pathToLabelMap: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/users": "Users",
};

export function getActiveLabel(pathname: string): string {
  if (pathToLabelMap[pathname]) {
    return pathToLabelMap[pathname];
  }

  if (pathname.startsWith("/dashboard/users/")) {
    return "Users";
  }

  return "";
}

export function isActivePath(pathname: string, itemPath: string): boolean {
  if (pathname === itemPath) {
    return true;
  }

  if (itemPath === "/dashboard/users" && pathname.startsWith("/dashboard/users/")) {
    return true;
  }

  return false;
}
