import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-buttons',
  imports: [],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css',
})
export class ButtonsComponent {
  @Input() count!: number;
  @Output() increment = new EventEmitter<void>();
  @Output() decrement = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();

  onInc() {
    this.increment.emit();
  }

  onDec() {
    if (this.count > 0) {
      this.decrement.emit();
    }
  }

  onReset() {
    if (this.count > 0) {
      this.reset.emit();
    }
  }
}
