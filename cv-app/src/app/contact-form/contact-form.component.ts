import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  //TODO: Link validations with markup.
  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    phoneNumber: [''],
    message: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    //TODO: Figure out what to do to send 
    console.warn(this.contactForm.value);
  }
}
