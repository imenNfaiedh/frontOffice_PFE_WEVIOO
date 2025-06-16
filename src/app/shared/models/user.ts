import {RoleUser} from "./roleUser.enum";

export class User {
  userId?: number;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  tel?:string;
  keycloakId?:string;
  suspicious_activity?:string;
  role: RoleUser | null | undefined;

}
