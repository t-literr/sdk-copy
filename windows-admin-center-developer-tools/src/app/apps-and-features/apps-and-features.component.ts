// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AppContextService } from '@microsoft/windows-admin-center-sdk/angular';
import { Logging, LogLevel } from '@microsoft/windows-admin-center-sdk/core';
import { AjaxError } from 'rxjs/observable/dom/AjaxObservable';
import { Subscription } from 'rxjs/Subscription';
import { PowerShellScripts } from '../../generated/powerShell-scripts';
import { Strings } from '../../generated/strings';
import { AppsAndFeaturesService } from './apps-and-features.service';
import { Net, PowerShellSession } from '@microsoft/windows-admin-center-sdk/core';
import { AppData } from './apps-and-features-data';

@Component({
    selector: 'sme-apps-and-features',
    templateUrl: './apps-and-features.component.html'
})
export class AppsAndFeaturesComponent implements OnInit, OnDestroy {
    public loading = true;
    public errorMessage: string;
    public strings = MsftSme.resourcesStrings<Strings>();




    // needed for ps function
    private appSubscription: Subscription;
    private psSession: PowerShellSession;
    public apps: AppData[];
    public appName: string;
    public appPublisher: any;

    constructor(private appContextService: AppContextService,
        private appsService: AppsAndFeaturesService) {
        this.strings = MsftSme.resourcesStrings<Strings>();
    }

    public ngOnInit(): void {
        console.log("ngonInit component")
        this.psSession = this.appContextService.powerShell.createSession(this.appContextService.activeConnection.nodeName);
        this.getApps();

        // set up any initialization logic here.

        // this.appContextService.
    }
    public ngOnDestroy() {
        // cleanup any calls here.
    }

        /*
    //  The Get Services call on the "hello service" initiates a PowerShell session executes
    */
   private getApps() {
    console.log("Components Class")
    this.appSubscription = this.appsService.getService(this.psSession, 'winrm').subscribe(
        (result: any) => {
            this.loading = false;
            if (result) {
                this.apps = result
            } else {
                this.appName = this.strings.HelloWorld.notFound;
            }
        },
        (error: AjaxError) => {
            this.errorMessage = Net.getErrorMessage(error);
            this.loading = false;
        }
    );
}
}
