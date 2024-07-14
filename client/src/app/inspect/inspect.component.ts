import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/user.service';

@Component({
  selector: 'app-inspect',
  templateUrl: './inspect.component.html',
  styleUrls: ['./inspect.component.css']
})
export class InspectComponent implements OnInit {
  username: string = ""
  userData: any
  error: string = ''

  constructor(private userService: UserService) { }

  ngOnInit(): void { }

  receiveUsername(valueEmitted: string) {
    this.username = valueEmitted;
  }

  async onSubmit() {
    try {
      this.userData = await this.userService.inspectUser(this.username)
      this.error = ''
    } catch (error: any) {
      if (error.status === 404) {
        this.error = 'Username not found. Please try again.'
      } else {
        this.error = 'Error fetching user data. Please try again later.'
      }
      this.userData = null
    }
  }
}

