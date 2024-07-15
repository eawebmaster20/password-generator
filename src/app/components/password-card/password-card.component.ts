import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { DataStateService } from '../../services/data-state.service';
import {MatSliderModule} from '@angular/material/slider';

@Component({
  selector: 'app-password-card',
  standalone: true,
  imports: [
    MatCheckboxModule, 
    FormsModule, 
    MatButtonModule, 
    MatIconModule,
    MatSliderModule
  ],
  templateUrl: './password-card.component.html',
  styleUrl: './password-card.component.scss'
})
export class PasswordCardComponent {
  uppercase:number = 0
  lowercase:number = 0
  numbers:number = 0
  symbols:number = 0
  constructor(public dataStateService: DataStateService){}

  update(){
    console.log(this.dataStateService.pwdChecker);
    this.dataStateService.pwdChecker.upperCase ? this.uppercase = 25 : this.uppercase=0;
    this.dataStateService.pwdChecker.lowerCase ? this.lowercase = 25 : this.lowercase=0;
    this.dataStateService.pwdChecker.number ? this.numbers = 25 : this.numbers=0;
    this.dataStateService.pwdChecker.symbol ? this.symbols = 25 : this.symbols=0;

    this.dataStateService.pwdStrength = this.uppercase + this.lowercase + this.numbers + this.symbols;
  }
}
