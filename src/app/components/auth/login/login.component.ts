import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService} from '../../../_services/auth.service';
import {Router} from '@angular/router';
import {state} from '@angular/animations';
import {map} from 'rxjs/internal/operators';
import {User} from '../../user/user';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder ,  private authService: AuthService , private router: Router) {
    this.createLoginForm();
    this.createRegisterForm();


  }

  owlcarousel = [
    {
      title: 'Welcome to Topmatic',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy.',
    },
    {
      title: 'Welcome to Topmatic',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy.',
    },
    {
      title: 'Welcome to Topmatic',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy.',
    }
  ];
  owlcarouselOptions = {
    loop: true,
    items: 1,
    dots: true
  };
  sex = null;
  model: any;
  url: any;


  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required , Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe : [false],
    });
  }
  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstname: [''],
      lastname: [''],
      email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
      password: ['', [Validators.required]],
      login: [''],
      phone: ['', [Validators.required, Validators.minLength(8)]],
      // sex: [''],
      adresse: [''],
      // birthdayDate: [''],
      image: [],

    });
  }
  get f() { return this.loginForm.controls; }

  get fR() {
    return this.registerForm.controls;
  }

  ngOnInit() {
  }

  onLogin() {
console.log(this.loginForm.get('email').value);
console.log(this.loginForm.get('password').value);
console.log(this.loginForm.get('rememberMe').value);
console.log(this.loginForm.invalid);
this.submitted = true;

    // stop here if form is invalid
if (this.loginForm.invalid) {
      return;
    }

this.authService.login( {
  username: this.loginForm.get('email').value ,
  password : this.loginForm.get('password').value ,
  rememberMe : this.loginForm.get('rememberMe').value })
  // .pipe(map(res => { return res}))
  .subscribe(  data => {
       const newUser = new User(data.id, data.firstname, data.lastname, data.email, data.tokenType, data.accessToken);
       localStorage.setItem('currentUser', JSON.stringify( newUser));
       console.log( localStorage.getItem('currentUser'));
       const user: User = JSON.parse(localStorage.getItem('currentUser'));
       console.log(user.id);
    },
    error => {
    throw error;
    //   if (error.status === 500) {
    //     //  redirect to error page
    //     this.router.navigate(['/server-error']);
    //   }
    },
    () => this.router.navigate(['/dashboard/default'], )
//     () => {
//     if (localStorage.getItem('currentUser')) {
//       // logged in so return true
//       return true;
//     }
//
//     // not logged in so redirect to login page with the return url
// this.router.navigate(['/dashboard/default'], );
// return false;
  );
  }

 // Error responses
 //  handleError(error: any) {
 //      if (error.status === 500) {
 //        //  redirect to error page
 //        this.router.navigate(['/server-error']);
 //      }
 //      return throwError(error.message);
 //  }

  onSave() {
    const user = {
      firstname: this.fR.firstname.value.trim(),
      lastname: this.fR.lastname.value.trim(),
      email: this.fR.email.value.trim(),
      password: this.fR.password.value.trim(),
      login: this.fR.login.value.trim(),
      phone: this.fR.phone.value.trim(),
      // sex: this.sex,
      adresse: this.fR.adresse.value.trim(),
      // birthdaydate: this.fR.birthdayDate.value.trim(),
      image: null,
    };
    const formData = new FormData();
    formData.append('files', this.url);
    formData.append('user', JSON.stringify(user));
     console.log(JSON.stringify(formData));
    this.authService.register(formData).subscribe(
      () => {
        console.log(user);
        // this.router.navigate(['/auth/login/login'], );
        window.location.reload();
      });
  }

    onReset() {
      this.submitted = false;
      this.registerForm.reset();
    }


  changeSex() {
    console.log(this.sex);
  }
  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.url = event.target.files[0];
    }
  }

}
