import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  imports: [FormsModule],
})
export class Home {
  @Input() url: string = '';

  onSubmit() {
    console.log('URL ingresada:', this.url);
  }
}