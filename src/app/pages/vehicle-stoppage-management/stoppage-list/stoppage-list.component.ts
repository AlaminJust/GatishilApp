import { IDropdown } from 'src/app/shared/models';
import { VehicleStoppageService } from './../../../shared/services/vehicle-stoppage.service';
import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stoppage-list',
  templateUrl: './stoppage-list.component.html',
  styleUrls: ['./stoppage-list.component.css']
})
export class StoppageListComponent {
  stoppages: IDropdown[] = [];

  constructor(
    private vehicleStoppageService: VehicleStoppageService,
    private router: Router
  ){
    this.vehicleStoppageService.getAllStoppages()
        .pipe(tap(x => {
          this.stoppages = x;
          this.stoppages.push({
            name: 'Fake',
            id: 100
          })
          this.stoppages.push({
            name: 'Fake',
            id: 100
          })
          this.stoppages.push({
            name: 'Fake',
            id: 100
          })
        })).subscribe();
  }

  addStoppage(){
    this.router.navigate(['stoppages/add']);
  }
}
