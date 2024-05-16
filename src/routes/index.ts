import { Route } from "../types";

import { AuthenticationRoutes, UserRoutes } from "../features";
// Note that here we are added the routes manually note that we can extend this feature to be added for example to our database in this case we would save deployment time, and in this case our changes for (undermaintenance routes, roles changing... would directly have there effects live!)
export const MergedRoutes: Route[] = [...AuthenticationRoutes, ...UserRoutes];
