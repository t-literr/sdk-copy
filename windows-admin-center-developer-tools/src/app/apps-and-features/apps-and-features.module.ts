import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    ActionsModule,
    AlertBarModule,
    DetailsModule,
    DataTableModule,
    LoadingWheelModule,
    MasterViewModule,
    SmeStylesModule,
    SplitViewModule,
    SvgModule,
    ToolHeaderModule
} from '@microsoft/windows-admin-center-sdk/angular';
import { AppsAndFeaturesComponent } from './apps-and-features.component';
import { AppsAndFeaturesRouting } from './apps-and-features.routing';
import { AppsAndFeaturesService } from './apps-and-features.service';

import { ContextMenuModule, SharedModule, TreeTableModule } from 'primeng/primeng';

@NgModule({
    declarations: [
        AppsAndFeaturesComponent
    ],
    providers: [
        AppsAndFeaturesService
    ],
    imports: [
        ActionsModule,
        AlertBarModule,
        CommonModule,
        DataTableModule,
        DetailsModule,
        FormsModule,
        LoadingWheelModule,
        SmeStylesModule,
        SvgModule,
        AppsAndFeaturesRouting,
        ToolHeaderModule,
        TreeTableModule,
        SplitViewModule,
        MasterViewModule
    ]
})
export class AppsAndFeaturesModule { }
