import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { WhistDataService } from '../common/service/whist-data.service';

@Component({
  selector: 'app-whist-section',
  standalone: true,
  imports: [
    NavBarComponent,
    NgFor,
    ReactiveFormsModule
  ],
  templateUrl: './whist-section.component.html',
  styleUrl: './whist-section.component.css'
})

export class WhistSectionComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private whistDataService: WhistDataService,
    private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      names: this.formBuilder.array([]),
      selectedPointSystem: this.formBuilder.control('option1'),
    });

    this.addName();
    this.addName();
    this.addName();
    this.addName();
  }

  get names() {
    return this.form.get('names') as FormArray;
  }

  addName() {
    this.names.push(this.formBuilder.control(''));
  }

  removeName(i: number) {
    this.names.removeAt(i);
  }

  onSubmit() {
    this.whistDataService.updateGameData(this.form);
    this.router.navigate(['/whist-game']);
  }
}
