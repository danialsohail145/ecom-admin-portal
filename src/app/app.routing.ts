import { Routes } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthGuard } from "./auth/guard/auth.guard";

export const AppRoutes: Routes = [
  {
    path: "",
    redirectTo: "auth",
    pathMatch: "full",
  },
  {
    path:'auth',
    loadChildren: ()=> import('./auth/auth.module').then(p=>p.AuthModule)
  },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./layouts/admin-layout/admin-layout.module").then(
            (x) => x.AdminLayoutModule
          ),
      },
    ],
    // canActivate:[
    //   AuthGuard
    // ]
  },
  {
    path: "**",
    redirectTo: "auth",
  },
];
