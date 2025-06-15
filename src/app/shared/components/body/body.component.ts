import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";
import {RouterOutlet} from "@angular/router";
 import {Button} from "primeng/button";
 import {Ripple} from "primeng/ripple";


@Component({
  selector: 'app-body',
  standalone: true,
  imports: [NgClass, RouterOutlet, Button, Ripple, ],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss',
  providers :[  ]
 })
export class BodyComponent {
  @Input() collapsed = false;
  @Input() screenWidth = 0;


  getBodyClass(): string {
    if (!this.collapsed) return '';

    return this.screenWidth > 768
      ? 'body-trimmed'
      : this.screenWidth > 0
        ? 'body-md-screen'
        : '';
  }

}
