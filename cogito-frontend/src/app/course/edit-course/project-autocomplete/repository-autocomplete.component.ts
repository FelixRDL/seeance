import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Project} from "../../../shared/core/Project";
import {ProjectService} from "../../../shared/project.service";
import {BehaviorSubject, Subject} from "rxjs";
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {Repository} from "../../../shared/core/Repository";
import {RepositoryService} from "../../../shared/repository.service";

@Component({
  selector: 'app-project-autocomplete',
  templateUrl: './repository-autocomplete-service.component.html',
  styleUrls: ['./repository-autocomplete-service.component.scss']
})
/**
 * Debounce Script taken from https://stackoverflow.com/questions/32051273/angular-and-debounce
 */
export class RepositoryAutocompleteComponent implements OnInit {
  @Output() repositorySelected: EventEmitter<Project> = new EventEmitter<Project>();
  repositories: BehaviorSubject<Repository[]> = new BehaviorSubject<Repository[]>([]);
  repoNameAutocomplete = new FormControl();

  constructor(
    private repos: RepositoryService
  ) { }

  ngOnInit(): void {
    this.repoNameAutocomplete.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(newValue => this.typeaheadProjects(newValue));
  }

  typeaheadProjects(q: string) {
    this.repos.getAutocomplete(q).subscribe((repos: Repository[]) => {
      this.repositories.next(repos);
    })
  }

  selectProject(project: Project) {
    this.repositorySelected.emit(project);
    this.repoNameAutocomplete.reset();
  }

}
