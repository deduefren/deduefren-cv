import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  //TODO: Link validations with markup.
  contactForm: FormGroup = this.fb.group({
    name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(80)])],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    phone: ['', Validators.maxLength(15)],
    message: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(1000)])]
  });
  statusCode = null;
  error = null;
  
  constructor(private fb: FormBuilder, private http: HttpClient) { 
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.http.post('/api/PostContactForm', this.contactForm.value)
    .subscribe((resp: any) => 
    { 
      this.statusCode = resp.statusCode;
      this.error = resp.message;
      if (this.statusCode == 0)
      {
        this.resetForm(this.contactForm);
      }
    });
  }

  resetForm(form: FormGroup) {

    form.reset();

    Object.keys(form.controls).forEach(key => {
      form.get(key)?.setErrors(null);
    });
  }

}
