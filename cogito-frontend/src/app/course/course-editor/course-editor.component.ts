import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Course} from "../../shared/core/Course";

@Component({
  selector: 'app-course-editor',
  templateUrl: './course-editor.component.html',
  styleUrls: ['./course-editor.component.scss']
})
export class CourseEditorComponent implements OnInit {
  @Input() action: string;
  @Output() onSubmit: EventEmitter<Course> = new EventEmitter<Course>();

  courseForm = this.fb.group({
    title: ['', Validators.required],
    description: ['']
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  save(): void {
    this.onSubmit.emit(<Course>this.courseForm.value);
  }

}
