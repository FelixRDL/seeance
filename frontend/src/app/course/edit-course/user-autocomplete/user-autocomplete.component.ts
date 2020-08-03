import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {UserService} from "../../../shared/user.service";
import {User} from "../../../shared/core/User";

@Component({
  selector: 'app-user-autocomplete',
  templateUrl: './user-autocomplete.component.html',
  styleUrls: ['./user-autocomplete.component.scss']
})
export class UserAutocompleteComponent implements OnInit {
  @Output() userSelected: EventEmitter<User> = new EventEmitter<User>();
  users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  userNameAutocomplete = new FormControl();

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userNameAutocomplete.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(newValue => this.typeaheadUsers(newValue));
  }

  typeaheadUsers(q: string) {
    this.userService.getAutocomplete(q).subscribe((result: User[]) => {
      this.users.next(result);
    });
  }

  selectUser(user: User) {
    this.userSelected.emit(user);
    this.userNameAutocomplete.reset();
    this.users.next([]);
  }
}
