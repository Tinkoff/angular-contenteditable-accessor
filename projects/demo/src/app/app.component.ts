import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

const html = '<b>HTML</b><p>with a paragraph</p><div>a div</div>and a plain text node';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    model = 'Initial value';

    disabled = true;

    readonly control = new FormControl('Initial value', {updateOn: 'blur'});

    readonly group = new FormGroup({
        control: new FormControl('Initial value'),
    });

    constructor() {
        this.group.disable();
    }

    onToggleModelDisabled(): void {
        this.disabled = !this.disabled;
    }

    onModelSetValue(): void {
        this.model = html;
    }

    onToggleControlDisabled(): void {
        if (this.control.disabled) {
            this.control.enable();
        } else {
            this.control.disable();
        }
    }

    onControlSetValue(): void {
        this.control.setValue(html);
    }

    onToggleNameDisabled(): void {
        if (this.group.disabled) {
            this.group.enable();
        } else {
            this.group.disable();
        }
    }

    onNameSetValue(): void {
        this.group.patchValue({
            control: html,
        });
    }
}
