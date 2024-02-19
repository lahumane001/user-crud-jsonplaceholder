import { Component, OnInit } from '@angular/core';
import { User } from '../shared/userModel.model';
import { UserService } from '../shared/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  allUserData!: User[];

  constructor(private userService : UserService , private router:Router){}

  ngOnInit(): void {
    this.FetchData()
  }
  FetchData(){
    this.userService.getUsers().subscribe(res=>{
      this.allUserData = res;
      console.log(this.allUserData);
      
    })
  }
  editUser(user: User): void {
    this.userService.selectedUser.next(user);
    this.router.navigate(['/user-form']);
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.allUserData = this.allUserData.filter(user => user.id !== id);
      });
    }
  }
}
