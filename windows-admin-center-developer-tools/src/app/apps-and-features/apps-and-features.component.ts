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

@Component({
    selector: 'sme-apps-and-features',
    templateUrl: './apps-and-features.component.html'
})
export class AppsAndFeaturesComponent implements OnInit, OnDestroy {
    public loading = true;
    public errorMessage: string;
    public strings = MsftSme.resourcesStrings<Strings>();

    // needed for cim function
    private processesSubscription: Subscription;
    public processes: any[];
    public selectedProces: any;
    public isExpanded: boolean;

    // needed for ps function
    private serviceSubscription: Subscription;
    private psSession: PowerShellSession;
    public serviceDisplayName: string;
    public serviceDefinition: any;

    constructor(private appContextService: AppContextService,
        private appsService: AppsAndFeaturesService) {
        this.strings = MsftSme.resourcesStrings<Strings>();
    }

    /**
     * When module navigation is initiated, this is called, and is required of all components to allow browser back and forward
     * functionality.  This is also required of any component that modifies the URL in any way or shape.
     */
    // public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
    //     Logging.log({
    //         source: 'sme-hello',
    //         level: LogLevel.Verbose,
    //         message: 'navigationTitle: {0}'.format(snapshot.pathFromRoot.map(x => x.url.join('/')).join('/'))
    //     });

    //     return MsftSme.resourcesStrings<Strings>().HelloWorld.title;
    // }

    public ngOnInit(): void {
        console.log("ngonInit component")
        this.psSession = this.appContextService.powerShell.createSession(this.appContextService.activeConnection.nodeName);
        this.getServices();

        // set up any initialization logic here.

        // this.appContextService.
    }
    public ngOnDestroy() {
        // cleanup any calls here.
    }

    // Cim class works
    private getProcesses() {
        console.log("get processes")
        this.processesSubscription = this.appsService.getProcesses().subscribe(
            (response: any) => {
                this.processes = response;
                this.loading = false;
            },
            (error: AjaxError) => {
                this.errorMessage = Net.getErrorMessage(error);
                this.loading = false;
            }
        );
    }

        /*
    //  The Get Services call on the "hello service" initiates a PowerShell session executes
    */
   private getServices() {
    console.log("get services")
    this.processes = [];
    this.serviceSubscription = this.appsService.getService(this.psSession, 'winrm').subscribe(
        (service: any) => {
            this.loading = false;
            if (service) {
                this.serviceDisplayName = service.displayName;
                this.serviceDefinition = service;
                this.processes.push(service.displayName)
            } else {
                this.serviceDisplayName = this.strings.HelloWorld.notFound;
            }
        },
        (error: AjaxError) => {
            this.errorMessage = Net.getErrorMessage(error);
            this.loading = false;
        }
    );
}
}
