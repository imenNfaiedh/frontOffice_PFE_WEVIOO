import {NavbarItem} from "./type";

export const NAV_BAR_ITEMS: NavbarItem[] = [
  {
    routeLink: 'admin/list-transaction',
    icon: 'pi pi-pencil',
    label: 'Titre1',
    title: false,
  },
  // {
  //   routeLink: 'admin/list-transaction',
  //   label: 'titre2',
  //   icon: '',
  //   title: true,
  // },
  {
    routeLink: 'admin/list-transaction',
    icon: 'pi pi-list',
    label: 'titre2',
    title: false,
  },
  {
    routeLink: '/admin/list-transaction',
    label: 'titre3',
    icon: 'fal fa-home',
    title: false,
  }
];
