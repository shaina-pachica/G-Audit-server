import { Role } from "../models/Role.model";

export function extractRoles(roles: Role[]): ("Owner" | "Employee" | undefined)[] {
  const roleSet = roles.map((r) => {
    if (r.name === "Owner" || r.name === "Employee") {
      return r.name
    }
  })
  return roleSet
}
