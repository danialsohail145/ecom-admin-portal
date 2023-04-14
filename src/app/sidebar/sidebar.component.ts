import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

export interface RouteInfo {
  path?: string;
  title: string;
  icon: string;
  class: string;
  subMenu?: any;
  hasSubMenu?: boolean;

}

export const ROUTES: RouteInfo[] = [
  { path: "/dashboard", title: "Dashboard", icon: "nc-bank", class: "" },
  {
    title: "Collection",
    icon: "nc-layout-11",
    class: "",
    hasSubMenu: false,
    subMenu: [
      {
        path: "/collection/add",
        title: "Add Collection",
        icon: "nc-simple-add",
        class: "",
      },
      {
        path: "/collection/view",
        title: "View Collection",
        icon: "nc-bullet-list-67",
        class: "",
      },
    ],
  },
  {
    title: "Product",
    icon: "nc-bag-16",
    class: "",
    hasSubMenu: false,
    subMenu: [
      {
        path: "/product/add",
        title: "Add Product",
        icon: "nc-simple-add",
        class: "",
      },
      {
        path: "/product/view",
        title: "View Product",
        icon: "nc-bullet-list-67",
        class: "",
      },

      {
        path: "/product/addSizeGuide",
        title: "Add Size Guide",
        icon: "nc-simple-add",
        class: "",
      },
      {
        path: "/product/viewSizeGuide",
        title: "View Size Guide",
        icon: "nc-bullet-list-67",
        class: "",
      },
    ],
  },
  { path: "/icons", title: "Icons", icon: "nc-diamond", class: "" },
  { path: "/maps", title: "Maps", icon: "nc-pin-3", class: "" },
  {
    path: "/notifications",
    title: "Notifications",
    icon: "nc-bell-55",
    class: "",
  },
  { path: "/user", title: "User Profile", icon: "nc-single-02", class: "" },
  { path: "/table", title: "Table List", icon: "nc-tile-56", class: "" },
  {
    path: "/typography",
    title: "Typography",
    icon: "nc-caps-small",
    class: "",
  },
];

@Component({
  moduleId: module.id,
  selector: "sidebar-cmp",
  templateUrl: "sidebar.component.html",
  styleUrls: ["sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  constructor(private router: Router){

  }
  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }

  menuClick(item : RouteInfo){
    
    if(item.path){
        this.router.navigate([item.path])
        // this.router.navigateByUrl()
    }else{
        
        item.hasSubMenu = !item.hasSubMenu;
    }
  }
  resetMenu(){
    this.menuItems.forEach(ele=>{
        ele.hasSubMenu = false;
    })
  }
}
