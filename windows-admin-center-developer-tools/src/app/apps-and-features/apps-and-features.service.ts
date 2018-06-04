// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Injectable } from '@angular/core';
import { AppContextService} from '@microsoft/windows-admin-center-sdk/angular';
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
    public getService(session: PowerShellSession, serviceName: string): Observable<any[]> {
        let command = PowerShell.createScript(PowerShellScripts.Get_Service, { name: serviceName });
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
}
