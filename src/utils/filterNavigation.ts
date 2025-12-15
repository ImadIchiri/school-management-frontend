import type { MainNavigationItemsTypes } from "./navigation";

type filterNavigationByPermissionsTypes = {
  navigation: MainNavigationItemsTypes[];
  userPermissions: string[];
};

export const filterNavigationByPermissions = ({
  navigation,
  userPermissions,
}: filterNavigationByPermissionsTypes): MainNavigationItemsTypes[] => {
  // ADMIN HAS FULL ACCESS
  if (userPermissions.includes("admin_full_access")) {
    return navigation;
  }

  return navigation.filter((item) => {
    // Items With Empty "permissions" List
    if (!item.permissions || item.permissions.length === 0) {
      return true;
    }

    // At least one permission matches
    return item.permissions.some((permission) =>
      userPermissions.includes(permission)
    );
  });
};
