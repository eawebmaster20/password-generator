import { Injectable } from '@angular/core';
import { pwdChecker } from '../interfaces/data-interface';

@Injectable({
  providedIn: 'root'
})
export class DataStateService {
  pwdStrength:number =0;
  generatedPwd:string=''
  pwdLength:number = 10
  uppercase:number = 0
  lowercase:number = 0
  numbers:number = 0
  symbols:number = 0
  pwdChecker:pwdChecker = {
    upperCase:false,
    lowerCase:false,
    number:false,
    symbol:false
  }
  constructor() { }
}
