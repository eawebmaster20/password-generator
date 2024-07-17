import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { DataStateService } from '../../services/data-state.service';
import {MatSliderModule} from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  strength:string = ''
  strengthClass:string = ''
  pwdStringData:string = ''
  pwdStringUppercase:string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  pwdStringLowercase:string = "abcdefghijklmnopqrstuvwxyz"
  pwdStringNumbers:string = "0123456789"
  pwdStringSymbol:string = "!@#$%^&*()_+[]{}|;:,.<>?"
  strng:string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+[]{}|;:,.<>?"
  constructor(public dataStateService: DataStateService,private _snackBar: MatSnackBar){}
  openSnackBar() {
    this._snackBar.open('copied!','',{
      duration: 2000,
    });
  }
  update(){

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
    if(this.dataStateService.generatedPwd.length < 8 ) {
      this.strengthClass = 'danger-fill';
      this.strength= 'TOO WEAK'
    }

    
    // password is of one character type
    if (this.dataStateService.generatedPwd.length > 7) {
      if (this.dataStateService.generatedPwd.length > 11) {
        if (this.dataStateService.pwdStrength > 50) {
          this.strengthClass ='green-fill';
          this.strength = 'STRONG';
        }
        else{
          this.strengthClass = 'normal-fill';
          this.strength = 'Medium'
        }
      }
      if (this.dataStateService.pwdStrength <= 25) {
        this.strengthClass = 'warning-fill';
        this.strength= 'WEAK'
      }
      if (this.dataStateService.pwdStrength === 50 && this.dataStateService.generatedPwd.length > 7) {
        this.strengthClass ='normal-fill';
        this.strength = 'MEDIUM';
      }
      if (this.dataStateService.pwdStrength > 50 && this.dataStateService.generatedPwd.length < 11) {
        this.strengthClass ='normal-fill';
        this.strength = 'MEDIUM';
      }
      
    };
    this.pwdStringData = ''
    console.log(this.dataStateService.generatedPwd.length, this.dataStateService.pwdStrength, this.strengthClass)

  }
}
