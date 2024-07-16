import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { DataStateService } from '../../services/data-state.service';
import {MatSliderModule} from '@angular/material/slider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-card',
  standalone: true,
  imports: [
    MatCheckboxModule, 
    FormsModule, 
    MatButtonModule, 
    MatIconModule,
    MatSliderModule,
    ClipboardModule,
    CommonModule
  ],
  templateUrl: './password-card.component.html',
  styleUrls: ['./password-card.component.scss','./password-card-mobile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PasswordCardComponent {
  uppercase:number = 0
  lowercase:number = 0
  numbers:number = 0
  symbols:number = 0
  strengthClass:string = ''
  pwdStringData:string = ''
  pwdStringUppercase:string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  pwdStringLowercase:string = "abcdefghijklmnopqrstuvwxyz"
  pwdStringNumbers:string = "0123456789"
  pwdStringSymbol:string = "!@#$%^&*()_+[]{}|;:,.<>?"
  strng:string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+[]{}|;:,.<>?"
  constructor(public dataStateService: DataStateService){}

  update(){
    // this.dataStateService.pwdStrength = 0
    // this.dataStateService.pwdChecker.upperCase ? 
    //   this.pwdStringData += this.pwdStringUppercase : this.pwdStringData.replace(this.pwdStringUppercase, '');
    // this.dataStateService.pwdChecker.lowerCase ? 
    //   this.pwdStringData += this.pwdStringLowercase : this.pwdStringData.replace(this.pwdStringLowercase, '');
    // this.dataStateService.pwdChecker.number ? 
    //   this.pwdStringData += this.pwdStringNumbers : this.pwdStringData.replace(this.pwdStringNumbers, '');
    // this.dataStateService.pwdChecker.symbol ? 
    //   this.pwdStringData += this.pwdStringSymbol : this.pwdStringData.replace(this.pwdStringSymbol, '');
   
    // building password strength variable
    this.dataStateService.pwdChecker.upperCase ? this.uppercase = 25 : this.uppercase=0;
    this.dataStateService.pwdChecker.lowerCase ? this.lowercase = 25 : this.lowercase=0;
    this.dataStateService.pwdChecker.number ? this.numbers = 25 : this.numbers=0;
    this.dataStateService.pwdChecker.symbol ? this.symbols = 25 : this.symbols=0;
    console.log(this.dataStateService.pwdChecker);
    
  }

  generatePwd(){
    this.dataStateService.pwdStrength = 0
    this.dataStateService.pwdStrength = this.uppercase + this.lowercase + this.numbers + this.symbols;

    this.dataStateService.pwdChecker.upperCase ? 
      this.pwdStringData += this.pwdStringUppercase : this.pwdStringData.replace(/[A-Z]/g, '');
    this.dataStateService.pwdChecker.lowerCase ? 
      this.pwdStringData += this.pwdStringLowercase : this.pwdStringData.replace(/[a-z]/g, '');
    this.dataStateService.pwdChecker.number ? 
      this.pwdStringData += this.pwdStringNumbers : this.pwdStringData.replace(/[0-9]/g, '');
    this.dataStateService.pwdChecker.symbol ? 
      this.pwdStringData += this.pwdStringSymbol : this.pwdStringData.replace(this.pwdStringSymbol, '');
console.log(this.pwdStringData);

    this.dataStateService.generatedPwd = ''
    for (let i = 0; i < this.pwdStringData.length; i++) {
      let index = Math.floor(Math.random()*this.pwdStringData.length)
      this.dataStateService.generatedPwd += this.pwdStringData[index]
    }
    this.dataStateService.generatedPwd = this.dataStateService.generatedPwd.slice(0, this.dataStateService.pwdLength)
    
    console.log(this.dataStateService.pwdChecker);
    // password is less than 8 characters
    this.dataStateService.generatedPwd.length < 8 ? this.strengthClass = 'danger-fill':'';;

    
    // password is of one character type
    this.dataStateService.generatedPwd.length > 7 && 
    this.dataStateService.pwdStrength === 25 ? 
    this.strengthClass = 'warning-fill':'';

    // password is of two character types
    this.dataStateService.generatedPwd.length > 7 && 
    this.dataStateService.pwdStrength === 50 ? 
    this.strengthClass ='normal-fill':'';

    // password is of two character types
    this.dataStateService.generatedPwd.length > 11 && 
    this.dataStateService.pwdStrength > 50 ? 
    this.strengthClass ='green-fill':'normal-fill';
    this.pwdStringData = ''
    console.log(this.dataStateService.generatedPwd.length, this.dataStateService.pwdStrength, this.strengthClass)

  }
}
