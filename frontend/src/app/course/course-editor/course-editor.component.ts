import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Course} from "../../shared/core/Course";
import {ProjectService} from "../../shared/project.service";
import {Observable} from "rxjs";
import {Project} from "../../shared/core/Project";

@Component({
  selector: 'app-course-editor',
  templateUrl: './course-editor.component.html',
  styleUrls: ['./course-editor.component.scss']
})
export class CourseEditorComponent implements OnInit, OnChanges {
  @Input() action: string;
  @Input() model: Course;
  @Output() onSubmit: EventEmitter<Course> = new EventEmitter<Course>();
  @Output() onDelete: EventEmitter<Course> = new EventEmitter<Course>();

  courseForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    projects: [''],
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.model) {
      // populate form from incoming value
      this.courseForm.patchValue(changes.model.currentValue);
    }
  }

  save(): void {
    let course: Course = this.courseForm.value;
    if(this.model !== undefined) {
      course._id = this.model._id;
    }
    this.onSubmit.emit(course);
  }

  delete(): void {
    console.log(this.model);
    this.onDelete.emit(this.model);
  }

}
