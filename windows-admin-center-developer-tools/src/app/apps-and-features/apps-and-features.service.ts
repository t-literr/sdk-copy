// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Injectable } from '@angular/core';
import { AppContextService } from '@microsoft/windows-admin-center-sdk/angular';
import { PowerShell, PowerShellSession } from '@microsoft/windows-admin-center-sdk/core';
import { Observable } from 'rxjs';
import { PowerShellScripts } from '../../generated/powerShell-scripts';
import { Strings } from '../../generated/strings';
import { AppData } from './apps-and-features-data';

@Injectable()
export class AppsAndFeaturesService {
    public static psKey = 'sme.seed';
    private psSession: PowerShellSession;

    constructor(private appContextService: AppContextService) {
    }

    /**
     *  This method illustrates how to execute a PowerShell script within the context of SME / Honolulu.
     */
    public getApps(session: PowerShellSession): Observable<any[]> {
        let command = PowerShell.createScript(PowerShellScripts.Get_Service);
        return this.appContextService.powerShell.run(session, command)
            .map(response => {
                const result: AppData[] = [];
                if (response) {
                    for (const item of response.results) {
                        if (item) {
                            const data: AppData = {
                                displayName: item.displayName,
                                publisher: item.publisher
                            };
                            result.push(data);
                        }
                    }
                }
                return result;
            });
    }

    public removeApp(session: PowerShellSession, productID: string): Observable<any[]> {
        console.log('Service class')
        let command = PowerShell.createScript(PowerShellScripts.Get_Process, { prodID: productID });
        return this.appContextService.powerShell.run(session, command)
            .map(response => {
                console.log('before response check')
                if (response) {
                    console.log('removed app output')
                    console.log(response)
                }
            });
    }
}
