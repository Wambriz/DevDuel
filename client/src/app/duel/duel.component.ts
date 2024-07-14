import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/user.service';

@Component({
  selector: 'app-duel',
  templateUrl: './duel.component.html',
  styleUrls: ['./duel.component.css']
})
export class DuelComponent implements OnInit {
  usernameOne: string = ""
  usernameTwo: string = ""
  userOneData: any
  userTwoData: any
  error: string = ""

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  receiveUsernameOne(valueEmitted: string) {
    this.usernameOne = valueEmitted;
  }

  receiveUsernameTwo(valueEmitted: string) {
    this.usernameTwo = valueEmitted;
  }

  async onSubmit() {
    this.userOneData = null
    this.userTwoData = null
    this.error = ''

    try {
      const data = await this.userService.duelUsers(this.usernameOne, this.usernameTwo)

      if (Array.isArray(data) && data.length === 2) {
        this.userOneData = data[0]
        this.userTwoData = data[1]
        this.error = ''
      } else {
        this.error = 'One or both usernames not found. Please try again.'
      }
    } catch (error: any) {
      if (error.status === 404) {
        this.error = 'One or both usernames not found. Please try again.'
      } else {
        this.error = 'Error fetching user data. Please try again later.'
      }
    }
  }

  get winnerInfo() {
    if (!this.userOneData || !this.userTwoData) {
      return null
    }
    const userOneScore = this.userOneData['total-stars'] + this.userOneData.followers
    const userTwoScore = this.userTwoData['total-stars'] + this.userTwoData.followers

    if (userOneScore > userTwoScore) {
      return { message: `${this.userOneData.username} Wins!`, winner: 0 }
    } else if (userOneScore < userTwoScore) {
      return { message: `${this.userTwoData.username} Wins!`, winner: 1 }
    } else {
      return { message: 'It\'s a Tie!', winner: -1 }
    }
  }
}
