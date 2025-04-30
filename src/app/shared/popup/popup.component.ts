import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  @Input() isOpen = false;
  @Output() closeModel = new EventEmitter();
  onCloseModel() {
    this.closeModel.emit(false);
  }

}
