import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Project} from "../../../shared/core/Project";
import {ProjectService} from "../../../shared/project.service";
import {BehaviorSubject, Subject} from "rxjs";
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";

@Component({
  selector: 'app-project-autocomplete',
  templateUrl: './project-autocomplete.component.html',
  styleUrls: ['./project-autocomplete.component.scss']
})
/**
 * Debounce Script taken from https://stackoverflow.com/questions/32051273/angular-and-debounce
 */
export class ProjectAutocompleteComponent implements OnInit {
  @Output() projectSelected: EventEmitter<Project> = new EventEmitter<Project>();

  private projects: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([]);
  private projectNameAutocomplete = new FormControl();
  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.projectNameAutocomplete.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(newValue => this.typeaheadProjects(newValue));
  }

  typeaheadProjects(q: string) {
    this.projectService.getAutocomplete(q).subscribe((projects: Project[]) => {
      this.projects.next(projects);
    })
  }

  selectProject(project: Project) {
    this.projectSelected.emit(project);
    this.projectNameAutocomplete.reset();
  }

}
