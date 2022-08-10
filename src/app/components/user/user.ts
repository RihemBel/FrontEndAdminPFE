import {Validators} from '@angular/forms';

export class User {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public tokenType: string;
  public token: string;
  // private _password: string;
  // private _login: string;
  // private _phone: string;
  // private _sex: string;
  // private _addres: string;
  // private _birthdayDate: string;

  // tslint:disable-next-line:max-line-length
  constructor(id: number, firstName: string, lastName: string, email: string, tokenType: string,  token: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.tokenType = tokenType;
    this.token = token;
    // this._password = password;
    // this._login = login;
    // this._phone = phone;
    // this._sex = sex;
    // this._addres = addres;
    // this._birthdayDate = birthdayDate;
  }

  // get id(): number {
  //   return this._id;
  // }
  //
  // set id(value: number) {
  //   this._id = value;
  // }
  //
  // get firstName(): string {
  //   return this._firstName;
  // }
  //
  // set firstName(value: string) {
  //   this._firstName = value;
  // }
  //
  // get lastName(): string {
  //   return this._lastName;
  // }
  //
  // set lastName(value: string) {
  //   this._lastName = value;
  // }
  //
  // get email(): string {
  //   return this._email;
  // }
  //
  // set email(value: string) {
  //   this._email = value;
  // }

//   get password(): string {
//     return this._password;
//   }
//
//   set password(value: string) {
//     this._password = value;
//   }
//
//   get login(): string {
//     return this._login;
//   }
//
//   set login(value: string) {
//     this._login = value;
//   }
//
//   get phone(): string {
//     return this._phone;
//   }
//
//   set phone(value: string) {
//     this._phone = value;
//   }
//
//   get sex(): string {
//     return this._sex;
//   }
//
//   set sex(value: string) {
//     this._sex = value;
//   }
//
//   get addres(): string {
//     return this._addres;
//   }
//
//   set addres(value: string) {
//     this._addres = value;
//   }
//
//   get birthdayDate(): string {
//     return this._birthdayDate;
//   }
//
//   set birthdayDate(value: string) {
//     this._birthdayDate = value;
//   }
 }
