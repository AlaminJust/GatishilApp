import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VehicleStoppageService } from 'src/app/shared/services/vehicle-stoppage.service';

@Component({
  selector: 'app-add-stoppage',
  templateUrl: './add-stoppage.component.html',
  styleUrls: ['./add-stoppage.component.css']
})
export class AddStoppageComponent {
  addOrUpdate!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private stoppageService: VehicleStoppageService
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm(): void {
    this.addOrUpdate = this.fb.group({
      name: ['', Validators.required],
      address: [''],
      latitude: [0, Validators.required],
      longitude: [0, Validators.required],
      applitude: [0, Validators.required],
      photo: ['']
    });
  }

  onSubmit() {
    if (this.addOrUpdate.valid) {
      this.stoppageService.add(this.addOrUpdate.value)
          .subscribe();
    }
  }
}
