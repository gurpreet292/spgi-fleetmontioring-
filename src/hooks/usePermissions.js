import { navigation } from "../config/navigation.config";
import { featureFlags } from "../config/featureFlags.config";

export function usePermissions(role) {

  if (!role) {
    return [];
  }

  return navigation.filter(
    item =>
      item.roles.includes(role) &&
      featureFlags[item.feature]
  );

}