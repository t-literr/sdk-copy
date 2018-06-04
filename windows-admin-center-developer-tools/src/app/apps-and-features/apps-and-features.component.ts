// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AppContextService, CheckValidationEventArgs, ValidationAlerts, ValidationAlertSeverity } from '@microsoft/windows-admin-center-sdk/angular';
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

    // needed for form to add new package
    public model: any;

    constructor(private appContextService: AppContextService,
        private appsService: AppsAndFeaturesService) {
        this.strings = MsftSme.resourcesStrings<Strings>();
        this.model = this.createModel();
    }

    public ngOnInit(): void {
        this.psSession = this.appContextService.powerShell.createSession(this.appContextService.activeConnection.nodeName);
        this.getApps();

        // set up any initialization logic here.

        // this.appContextService.
    }
    public ngOnDestroy() {
        // cleanup any calls here.
    }


    /**
     * Resets the form controls data model to a predefined initial state
     */
    public createModel() {
        return {
            name: {
                label: 'App Package Name',
                value: '',
                error: 'Sorry that is not a valid package name.',
                valid: false
            }
        };
    }

    /*
    //  Initiates powershell script to retrieve list of all currently installed applications
    */
   private getApps() {
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

    public removeApp(): void {
        console.log("GET IT OUTTA HERE!")
    }

    public addApp(): void {
        console.log("OH YEAH NOW WE'RE COOKIN'")
        console.log(this.model.value)
    }

    /**
     * This is only one of many ways to add validation to a form field.
     * @param name the field name
     * @param event the validation event
     */
    public onCustomValidate(name: string, event: CheckValidationEventArgs) {
        let alerts: ValidationAlerts = {};
        if (name === 'addApp') {
            if (event.formControl.value.length <= 0) {
                alerts['notValid'] = {
                    valid: false,
                    message: this.model.name.error,
                    severity: ValidationAlertSeverity.Error
                };
            } else {
                console.log("good to go!")
                this.model.name.valid = true
            }
        }

        MsftSme.deepAssign(event.alerts, alerts);
    }
}
