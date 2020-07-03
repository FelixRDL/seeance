import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config/config.component';
import { AnalysisConfigComponent } from './analysis-config/analysis-config.component';
import {MaterialModule} from "../material/material.module";
import {MatDialogModule} from "@angular/material/dialog";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {CourseService} from "../shared/course.service";
import {UserService} from "../shared/user.service";
import {ProjectService} from "../shared/project.service";
import {PluginsService} from "../shared/plugins.service";
import {JsonFormsAngularService, JsonFormsModule} from "@jsonforms/angular";
import {SchemaFormModule} from "ngx-schema-form";

@NgModule({
  declarations: [
    ConfigComponent,
    AnalysisConfigComponent
  ],
    imports: [
        MaterialModule,
        MatDialogModule,
        CommonModule,
        SharedModule,
        RouterModule,

        JsonFormsModule,
        SchemaFormModule
    ],
  providers: [
    CourseService,
    UserService,
    ProjectService,
    PluginsService,

    JsonFormsAngularService
  ]
})

export class PluginConfigModule { }
