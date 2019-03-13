import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ContenteditableValueAccessorModule} from './module';

describe('ContenteditableValueAccessor', () => {
    @Component({
        template: `
            <div #modelEl contenteditable [(ngModel)]="model" [disabled]="disabled"></div>
            <div #controlEl contenteditable [formControl]="control"></div>
            <form [formGroup]="group">
                <div #nameEl contenteditable formControlName="control"></div>
            </form>
        `,
    })
    class TestComponent {
        @ViewChild('modelEl', {read: ElementRef})
        readonly modelElementRef?: ElementRef<HTMLElement>;

        @ViewChild('controlEl', {read: ElementRef})
        readonly controlElementRef?: ElementRef<HTMLElement>;

        @ViewChild('nameEl', {read: ElementRef})
        readonly nameElementRef?: ElementRef<HTMLElement>;

        disabled = false;
        model = 'Initial model';
        readonly control = new FormControl();
        readonly group = new FormGroup({
            control: new FormControl('Initial value'),
        });
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;

    const html = '<b>HTML</b>';

    function modelEl(): HTMLElement {
        return component.modelElementRef!.nativeElement;
    }

    function controlEl(): HTMLElement {
        return component.controlElementRef!.nativeElement;
    }

    function nameEl(): HTMLElement {
        return component.nameElementRef!.nativeElement;
    }

    beforeEach(done => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
                ContenteditableValueAccessorModule,
            ],
            declarations: [TestComponent],
        });

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            done();
        });
    });

    describe('ngModel', () => {
        it('initial value is in the DOM', () => {
            expect(modelEl().textContent).toBe('Initial model');
        });

        it('contenteditable="true"', () => {
            const contenteditable = modelEl().getAttribute('contenteditable');
            const result = contenteditable === 'true' || contenteditable === '';

            // Either string 'true' or empty attribute (initial enabled value) work
            expect(result).toBe(true);
        });

        it('contenteditable="false"', done => {
            component.disabled = true;
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                expect(modelEl().getAttribute('contenteditable')).toBe('false');
                done();
            });
        });

        it('model is updated', () => {
            modelEl().innerHTML = html;
            modelEl().dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(component.model).toBe(html);
        });

        it('DOM is updated', done => {
            component.model = html;
            fixture.detectChanges();

            fixture.whenStable().then(() => {
                expect(modelEl().firstElementChild!.tagName).toBe('B');
                done();
            });
        });
    });

    describe('formControl', () => {
        it('initial value is empty = DOM is empty', () => {
            expect(controlEl().textContent).toBe('');
        });

        it('contenteditable="true"', () => {
            const contenteditable = controlEl().getAttribute('contenteditable');
            const result = contenteditable === 'true' || contenteditable === '';

            // Either string 'true' or empty attribute (initial enabled value) work
            expect(result).toBe(true);
        });

        it('contenteditable="false"', () => {
            component.control.disable();
            fixture.detectChanges();

            expect(controlEl().getAttribute('contenteditable')).toBe('false');
        });

        it('control is updated', () => {
            controlEl().innerHTML = html;
            controlEl().dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(component.control.value).toBe(html);
        });

        it('DOM is updated', done => {
            component.control.setValue(html);
            fixture.detectChanges();

            fixture.whenStable().then(() => {
                expect(controlEl().firstElementChild!.tagName).toBe('B');
                done();
            });
        });

        it('control is not touched initially', () => {
            expect(component.control.touched).toBe(false);
        });

        it('marks control as touched on blur', () => {
            controlEl().focus();
            controlEl().blur();
            fixture.detectChanges();

            expect(component.control.touched).toBe(true);
        });
    });

    describe('formControlName', () => {
        it('initial value is in the DOM', () => {
            expect(nameEl().textContent).toBe('Initial value');
        });

        it('contenteditable="true"', () => {
            const contenteditable = nameEl().getAttribute('contenteditable');
            const result = contenteditable === 'true' || contenteditable === '';

            // Either string 'true' or empty attribute (initial enabled value) work
            expect(result).toBe(true);
        });

        it('contenteditable="false"', () => {
            component.group.disable();
            fixture.detectChanges();

            expect(nameEl().getAttribute('contenteditable')).toBe('false');
        });

        it('control is updated', () => {
            nameEl().innerHTML = html;
            nameEl().dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(component.group.get('control')!.value).toBe(html);
        });

        it('DOM is updated', done => {
            component.group.patchValue({control: html});
            fixture.detectChanges();

            fixture.whenStable().then(() => {
                expect(nameEl().firstElementChild!.tagName).toBe('B');
                done();
            });
        });
    });

    describe('MutationObserver fallback', () => {
        it('updates model after DOM changes', done => {
            modelEl().appendChild(document.createElement('DIV'));
            fixture.detectChanges();

            setTimeout(() => {
                fixture.whenStable().then(() => {
                    expect(component.model).toBe('Initial model<div></div>');
                    done();
                });
            });
        });

        it('stops observing after Input event', done => {
            modelEl().dispatchEvent(new Event('input'));
            modelEl().appendChild(document.createElement('DIV'));
            fixture.detectChanges();

            setTimeout(() => {
                fixture.whenStable().then(() => {
                    expect(component.model).toBe('Initial model');
                    done();
                });
            });
        });
    });

    it('when everything is removed, auto inserted remaining <br> is treated as empty string', done => {
        component.model = '<b>HTML</b>';
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            modelEl().focus();
            document
                .getSelection()!
                .getRangeAt(0)
                .selectNode(modelEl().firstChild!);
            document.execCommand('delete');

            expect(modelEl().innerHTML).toBe('<br>');
            expect(component.model).toBe('');
            done();
        });
    });
});
