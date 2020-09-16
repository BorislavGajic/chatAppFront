import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-registracion',
  templateUrl: './registracion.component.html',
  styleUrls: ['./registracion.component.css']
})
export class RegistracionComponent implements OnInit {
  registerForm: FormGroup;

  constructor(    private formBuilder: FormBuilder,
                  private router: Router,
                  private service: AuthService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  // tslint:disable-next-line:typedef
  onSubmit() {
    this.service.register(this.registerForm.value)
      .pipe(first())
      .subscribe();
    this.router.navigate(['/login']);

  }
}
