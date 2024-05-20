import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Role } from '../../model/roles/role';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-role-selector',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './role-selector.component.html',
  styleUrl: './role-selector.component.scss',
})
export class RoleSelectorComponent {
  @Input() roles: Array<Role> = [];
  @Input() selectedRole: Role;
  @Output() roleChanged = new EventEmitter<Role>();
  constructor() {}

  handleRoleSelection(role: Role): void {
    this.roleChanged.emit(role);
  }
}
