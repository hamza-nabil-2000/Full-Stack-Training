import { Component } from '@angular/core';
import { DisplayComponent } from './display/display.component';
import { ButtonsComponent } from './buttons/buttons.component';

@Component({
  selector: 'app-root',
  imports: [DisplayComponent, ButtonsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Counter App';

  count: number = 0;

  onIncrement() {
    this.count++;
  }

  onDecrement() {
    if (this.count > 0) {
      this.count--;
    }
  }

  onReset() {
    if (this.count > 0) {
      this.count = 0;
    }
  }
}
