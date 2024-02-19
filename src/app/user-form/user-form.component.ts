import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../shared/user-service.service';
import { Router } from '@angular/router';
import { User } from '../shared/userModel.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userFormData !: FormGroup;
  isEditMode: boolean = false;
  selectedUser: User | null = null;
  constructor(private userserv: UserService, private router: Router) { }

  ngOnInit(): void {

    this.userFormData = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      street: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      zipcode: new FormControl(null, [Validators.required]),
    })
    this.userserv.selectedUser.subscribe(user => {
      if (user) {
        this.isEditMode = true;
        this.selectedUser = user;
        this.userFormData.patchValue({
          name: user.name,
          username: user.username,
          email: user.email,
          street: user.address.street,
          city: user.address.city,
          zipcode: user.address.zipcode
        });
      } else {
        this.isEditMode = false;
        this.selectedUser = null;
      }
    });
  }

  onSubmit(): void {
    const newUser: User = this.userFormData.value;
    if (this.isEditMode && this.selectedUser) {
      // Update user
      newUser.id = this.selectedUser.id; // Make sure to include user ID for update
      this.userserv.updateUser(newUser, this.selectedUser.id).subscribe(
        updatedUser => {
          console.log('User updated successfully:', updatedUser);
          this.router.navigate([''])
          this.userserv.selectedUser.next(null); // Clear selected user
        }
      );
    } else {
      // Add user
      this.userserv.addUsers(newUser).subscribe(
        addedUser => {
          console.log('User added successfully:', addedUser);
          this.router.navigate([''])
        }
      );
    }
  }
}

