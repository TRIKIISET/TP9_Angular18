import { Component } from '@angular/core';
import { GameAddComponent } from './application/components/game-add/game-add.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ GameAddComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TP9';
}
