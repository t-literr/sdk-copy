import { SettingsFormService } from '@msft-sme/shell/angular';

import { Component } from '@angular/core';

@Component({
    selector: 'sme-ng2-controls-settings-example',
    templateUrl: './settings-example.component.html'
})
export class SettingsExampleComponent {
    constructor(private settingsFormService: SettingsFormService) {
    }
}