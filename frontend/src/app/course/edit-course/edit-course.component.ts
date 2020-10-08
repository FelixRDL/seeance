import {Component, OnInit} from '@angular/core';
import {Project} from "../../shared/core/Project";
import {CourseService} from "../../shared/course.service";
import {Course} from "../../shared/core/Course";
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject, forkJoin} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Repository} from "../../shared/core/Repository";
import {ProjectService} from "../../shared/project.service";
import {User} from "../../shared/core/User";
import {UserService} from "../../shared/user.service";
import {ConfirmModalComponent} from "../../shared/modals/confirm.modal/confirm.modal.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent {
  projects: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([]);
  authorizees: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  activeCourse: BehaviorSubject<Course> = new BehaviorSubject<Course>(undefined);

  constructor(
    private courseRepository: CourseService,
    private projectRepository: ProjectService,
    private projectRepo: ProjectService,
    private userRepo: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.route.params.subscribe((params) => {
    if (params.id) {
      this.fetchData(params.id);
    }
  });
  }

  fetchData(courseId: string): void {
    this.courseRepository.getCourseById(courseId).subscribe((course: Course) => {
      this.activeCourse.next(course);
      forkJoin(course.projectIds.map(pid => {
        return this.projectRepository.getProjectById(course._id, pid);
      })).subscribe((projects: Project[]) => {
        this.projects.next(projects)
      });
    }, (errors) => {
      if(errors.status == 401) {
        this.snackbar.open( "You are not authorized to access this course. Please ask its owner to grant you access.", "OK");
        this.router.navigate(['']);
      } else {
        console.error(errors);
      }
    });

    this.userRepo.getAuthorizeesForCourse(courseId).subscribe((users: []) => {
      this.authorizees.next(users);
    });
  }


  onRepositorySelected(repo: Repository) {
    const newProject: Project = {
      _id: undefined,
      repository: repo
    };
    this.projectRepo.createProject(this.activeCourse.getValue()._id, newProject).subscribe((project: Project) => {
      const projects: Project[] = this.projects.getValue();
      projects.push(project);
      this.projects.next(projects);
      // TODO: adapt this stuff
      this.courseRepository.updateCourses();
    }, (err) => {
      this.snackbar.open(err.error, "OK");
    });
  }

  onSaveCourse(course: Course) {
    this.courseRepository.updateCourse(course).subscribe((course: Course) => {
      console.log(course);
      this.courseRepository.updateCourses();
      this.activeCourse.next(course);
    });
  }

  onDeleteCourse(course: Course) {
    let dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        decline: 'Cancel',
        accept: 'Delete',
        title: 'Confirm Course Deletion',
        message: 'Do you really want to delete the course ' + course.title + '? You cannot undo this.'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.courseRepository.deleteCourseById(course._id).subscribe((result) => {
        this.courseRepository.updateCourses();
        this.snackbar.open("Successfully removed course!", 'OK');
        this.router.navigate(['']);
      }, (err: any) => {
        this.snackbar.open(err.message, 'OK');
      })
      }
    });
  }

  onDeleteProject(project: Project) {
    this.projectRepo.deleteProjectById(this.activeCourse.getValue()._id, project._id).subscribe((id: string) => {
      this.projects.next(this.projects.getValue().filter((item: Project) => item._id !== id));
    })
  }

  //
  //
  //

  onAddUser(user: User) {
    this.userRepo.addAuthorizeeToCourse(this.activeCourse.getValue()._id, user).subscribe((data) => {
      this.userRepo.getAuthorizeesForCourse(this.activeCourse.getValue()._id).subscribe((users: []) => {
        this.authorizees.next(users);
      });
    })
  }

  onDeleteUser(user: User) {
    this.userRepo.removeAuthorizeeFromCourse(this.activeCourse.getValue()._id, user).subscribe((data) => {
      this.userRepo.getAuthorizeesForCourse(this.activeCourse.getValue()._id).subscribe((users: []) => {
        this.authorizees.next(users);
      });
    });
  }
}
