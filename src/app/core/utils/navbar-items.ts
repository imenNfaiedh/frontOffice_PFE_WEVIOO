import {NavbarItem} from "./type";

export const NAV_BAR_ITEMS: NavbarItem[] = [
  {
    routeLink: '/admin/dashboard',
    icon: 'fal fa-home',
    label: 'Dashboard',
    title: false,
  },
  {
    routeLink: '/admin/information-compteBancaire',
    label: 'Compte Bancaire',
    icon: ' pi pi-wallet',
    title: false,
  },
  {
    routeLink: '/admin/list-transaction',
    label: 'Transaction',
    icon: ' pi pi-credit-card',
    title: false,
  },
  {
    routeLink: '/admin/list-reclamation',
    label: 'Réclamation',
    icon: ' pi pi-comments',
    title: false,
  }
];
