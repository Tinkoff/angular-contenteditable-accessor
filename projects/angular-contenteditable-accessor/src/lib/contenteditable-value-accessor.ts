import {
    AfterViewInit,
    Directive,
    ElementRef,
    forwardRef,
    HostListener,
    Inject,
    OnDestroy,
    Renderer2,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

/*
 * This is a barebones contenteditable {@link ControlValueAccessor} allowing you to use
 * Angular forms with native contenteditable HTML. For security reasons you might want
 * to consider sanitizing pasted/dropped content before using it. Also make sure that
 * you do not set any dangerous content as control value yourself, because directive
 * just outputs control value as-is.
 */
@Directive({
    selector:
        '[contenteditable][formControlName], [contenteditable][formControl], [contenteditable][ngModel]',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ContenteditableValueAccessor),
            multi: true,
        },
    ],
})
export class ContenteditableValueAccessor
    implements ControlValueAccessor, AfterViewInit, OnDestroy {
    /*
     * MutationObserver IE11 fallback (as opposed to input event for modern browsers).
     * When mutation removes a tag, i.e. delete is pressed on the last remaining character
     * inside a tag — callback is triggered before the DOM is actually changed, therefore
     * setTimeout is used
     */
    private observer = new MutationObserver(() => {
        setTimeout(() => {
            this.onChange(
                ContenteditableValueAccessor.processValue(
                    this.elementRef.nativeElement.innerHTML,
                ),
            );
        });
    });

    /*
     * onTouch callback that marks control as touched and allows FormHooks use
     */
    private onTouched = () => {};

    /*
     * onChange callback that writes value to control and allows FormHooks use
     */
    private onChange: (value: string) => void = () => {};

    constructor(
        @Inject(ElementRef) private readonly elementRef: ElementRef,
        @Inject(Renderer2) private readonly renderer: Renderer2,
    ) {}

    /*
     * To support IE11 MutationObserver is used to monitor changes to the content
     */
    ngAfterViewInit() {
        this.observer.observe(this.elementRef.nativeElement, {
            characterData: true,
            childList: true,
            subtree: true,
        });
    }

    /*
     * Disconnect MutationObserver IE11 fallback on destroy
     */
    ngOnDestroy() {
        this.observer.disconnect();
    }

    /*
     * Listen to input events to write innerHTML value into control,
     * also disconnect MutationObserver as it is not needed if this
     * event works in current browser
     */
    @HostListener('input')
    onInput() {
        this.observer.disconnect();
        this.onChange(
            ContenteditableValueAccessor.processValue(
                this.elementRef.nativeElement.innerHTML,
            ),
        );
    }

    /*
     * Listen to blur event to mark control as touched
     */
    @HostListener('blur')
    onBlur() {
        this.onTouched();
    }

    /*
     * Reacts to external change
     *
     * @see {@link ControlValueAccessor#writeValue}
     */
    writeValue(value: string | null) {
        this.renderer.setProperty(
            this.elementRef.nativeElement,
            'innerHTML',
            ContenteditableValueAccessor.processValue(value),
        );
    }

    /*
     * Registers onChange callback
     *
     * @see {@link ControlValueAccessor#registerOnChange}
     */
    registerOnChange(onChange: (value: string) => void) {
        this.onChange = onChange;
    }

    /*
     * Registers onTouch callback
     *
     * @see {@link ControlValueAccessor#registerOnTouched}
     */
    registerOnTouched(onTouched: () => void) {
        this.onTouched = onTouched;
    }

    /*
     * Sets disabled state by setting contenteditable attribute to true/false
     *
     * @see {@link ControlValueAccessor#setDisabledState}
     */
    setDisabledState(disabled: boolean) {
        this.renderer.setAttribute(
            this.elementRef.nativeElement,
            'contenteditable',
            String(!disabled),
        );
    }

    /*
     * null and other falsy control values are treated as empty string to
     * prevent IE11 outputting 'null', also single <br> is replaced with empty
     * string when passed to the control
     */
    private static processValue(value: string | null): string {
        const processed = value || '';

        return processed.trim() === '<br>' ? '' : processed;
    }
}
