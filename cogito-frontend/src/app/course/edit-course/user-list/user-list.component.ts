import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../shared/core/User";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Input() users: User[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
