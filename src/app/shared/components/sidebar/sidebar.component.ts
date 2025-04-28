import {Component, EventEmitter, HostListener, OnInit, Output, ViewChild} from '@angular/core';
import {Drawer, DrawerModule} from "primeng/drawer";
import {ButtonModule} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {AvatarModule} from "primeng/avatar";
import {StyleClass} from "primeng/styleclass";
import {APP_CONSTANTS, MOBILE_BREAKPOINT} from '../../../core/utils/constants';
import {ScreenConfig, SideNavToggle} from "../../../core/utils/type";
import {animate, style, transition, trigger} from '@angular/animations';
import {NAV_BAR_ITEMS} from "../../../core/utils/navbar-items";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [DrawerModule, ButtonModule, Ripple, AvatarModule, StyleClass, RouterLink, RouterLinkActive, NgClass, NgIf, NgForOf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('350ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('350ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class SidebarComponent implements  OnInit{
  @Output() private readonly toggleSideNav = new EventEmitter<SideNavToggle>();

  public collapsed = false;
  public screenWidth = 0;
  public readonly navItems = NAV_BAR_ITEMS;

  ngOnInit(): void {
    this.updateScreenWidth();
    this.handleScreenResize();
  }

  @HostListener('window:resize')
  private onResize(): void {
    this.updateScreenWidth();
    this.handleScreenResize();
  }

  public toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.emitSideNavState();
  }

  public closeSidenav(): void {
    this.collapsed = false;
    this.emitSideNavState();
  }

  public selectItem(): void {
    if (this.isMobileView()) {
      this.collapsed = false;
      this.emitSideNavState();
    }
  }

  private updateScreenWidth(): void {
    this.screenWidth = window.innerWidth;
  }

  private handleScreenResize(): void {
    this.collapsed = !this.isMobileView();
    this.emitSideNavState();
  }

  private isMobileView(): boolean {
    return this.screenWidth <= MOBILE_BREAKPOINT;
  }

  private emitSideNavState(): void {
    this.toggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }


}
