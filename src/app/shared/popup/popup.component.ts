import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  //`@Input()` : Permet au **composant parent** de **contrôler si la popup est ouverte ou fermée**
  @Input() isOpen = false;
  // Définit un événement que le composant **envoie au parent**.
  // `closeModel` : event close model
  @Output() closeModel = new EventEmitter();
  @Input() popupTitle: string = '';
  onCloseModel() {
    this.closeModel.emit(false);
  }

}
