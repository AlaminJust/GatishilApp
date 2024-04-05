import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IDropdown } from 'src/app/shared/models/dropdown.model';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent {
  @Input() items!: IDropdown[];
  @Input() thisControl!: FormControl;
}
