import { Roles } from "./enums";

interface User {
  role: Roles;
  name: string;
  id: number;
  email: string;
}

export default User;
