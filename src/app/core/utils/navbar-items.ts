import {NavbarItem} from "./type";

export const NAV_BAR_ITEMS: NavbarItem[] = [
  {
    routeLink: '/admin/dashboard',
    icon: 'pi pi-credit-card',
    label: 'Dashboard',
    title: false,
  },
  {
    routeLink: '/admin/list-transaction',
    label: 'Transaction',
    icon: 'fal fa-home',
    title: false,
  }
];
