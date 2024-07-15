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
  userOneError: string = ''
  userTwoError: string = ''

  constructor(private userService: UserService) { }

  ngOnInit(): void { }

  receiveUsernameOne(valueEmitted: string) {
    this.usernameOne = valueEmitted;
  }

  receiveUsernameTwo(valueEmitted: string) {
    this.usernameTwo = valueEmitted;
  }

  async onSubmit() {
    this.userOneData = null
    this.userTwoData = null
    this.userOneError = ''
    this.userTwoError = ''

    try {
      const userOne = await this.userService.inspectUser(this.usernameOne)
      this.userOneData = userOne
    } catch (error: any) {
      if (error.status === 404) {
        this.userOneError = `Username "${this.usernameOne}" not found.`
      } else {
        this.userOneError = `Error fetching data for "${this.usernameOne}". Please try again later.`
      }
    }

    try {
      const userTwo = await this.userService.inspectUser(this.usernameTwo)
      this.userTwoData = userTwo
    } catch (error: any) {
      if (error.status === 404) {
        this.userTwoError = `Username "${this.usernameTwo}" not found.`
      } else {
        this.userTwoError = `Error fetching data for "${this.usernameTwo}". Please try again later.`
      }
    }
  }

  get winnerInfo() {
    if (!this.userOneData || !this.userTwoData) {
      return null
    }
    const userOneFollowers = this.userOneData.followers
    const userTwoFollowers = this.userTwoData.followers

    if (userOneFollowers > userTwoFollowers) {
      return { message: `${this.userOneData.username} Wins!`, winner: 0 }
    } else if (userOneFollowers < userTwoFollowers) {
      return { message: `${this.userTwoData.username} Wins!`, winner: 1 }
    } else {
      return { message: 'It\'s a Tie!', winner: -1 }
    }
  }
}
