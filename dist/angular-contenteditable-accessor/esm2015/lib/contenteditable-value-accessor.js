/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, forwardRef, HostListener, Inject, Renderer2, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
/*
 * This is a barebones contenteditable {@link ControlValueAccessor} allowing you to use
 * Angular forms with native contenteditable HTML. For security reasons you might want
 * to consider sanitizing pasted/dropped content before using it. Also make sure that
 * you do not set any dangerous content as control value yourself, because directive
 * just outputs control value as-is.
 */
export class ContenteditableValueAccessor {
    /**
     * @param {?} elementRef
     * @param {?} renderer
     */
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        /*
             * MutationObserver IE11 fallback (as opposed to input event for modern browsers).
             * When mutation removes a tag, i.e. delete is pressed on the last remaining character
             * inside a tag — callback is triggered before the DOM is actually changed, therefore
             * setTimeout is used
             */
        this.observer = new MutationObserver((/**
         * @return {?}
         */
        () => {
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.onChange(ContenteditableValueAccessor.processValue(this.elementRef.nativeElement.innerHTML));
            }));
        }));
        /*
             * onTouch callback that marks control as touched and allows FormHooks use
             */
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
        /*
             * onChange callback that writes value to control and allows FormHooks use
             */
        this.onChange = (/**
         * @return {?}
         */
        () => { });
    }
    /*
         * To support IE11 MutationObserver is used to monitor changes to the content
         */
    /**
     * @return {?}
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
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.observer.disconnect();
    }
    /*
         * Listen to input events to write innerHTML value into control,
         * also disconnect MutationObserver as it is not needed if this
         * event works in current browser
         */
    /**
     * @return {?}
     */
    onInput() {
        this.observer.disconnect();
        this.onChange(ContenteditableValueAccessor.processValue(this.elementRef.nativeElement.innerHTML));
    }
    /*
         * Listen to blur event to mark control as touched
         */
    /**
     * @return {?}
     */
    onBlur() {
        this.onTouched();
    }
    /*
         * Reacts to external change
         *
         * @see {@link ControlValueAccessor#writeValue}
         */
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.renderer.setProperty(this.elementRef.nativeElement, 'innerHTML', ContenteditableValueAccessor.processValue(value));
    }
    /*
         * Registers onChange callback
         *
         * @see {@link ControlValueAccessor#registerOnChange}
         */
    /**
     * @param {?} onChange
     * @return {?}
     */
    registerOnChange(onChange) {
        this.onChange = onChange;
    }
    /*
         * Registers onTouch callback
         *
         * @see {@link ControlValueAccessor#registerOnTouched}
         */
    /**
     * @param {?} onTouched
     * @return {?}
     */
    registerOnTouched(onTouched) {
        this.onTouched = onTouched;
    }
    /*
         * Sets disabled state by setting contenteditable attribute to true/false
         *
         * @see {@link ControlValueAccessor#setDisabledState}
         */
    /**
     * @param {?} disabled
     * @return {?}
     */
    setDisabledState(disabled) {
        this.renderer.setAttribute(this.elementRef.nativeElement, 'contenteditable', String(!disabled));
    }
    /*
         * null and other falsy control values are treated as empty string to
         * prevent IE11 outputting 'null', also single <br> is replaced with empty
         * string when passed to the control
         */
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    static processValue(value) {
        /** @type {?} */
        const processed = value || '';
        return processed.trim() === '<br>' ? '' : processed;
    }
}
ContenteditableValueAccessor.decorators = [
    { type: Directive, args: [{
                selector: '[contenteditable][formControlName], [contenteditable][formControl], [contenteditable][ngModel]',
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => ContenteditableValueAccessor)),
                        multi: true,
                    },
                ],
            },] }
];
/** @nocollapse */
ContenteditableValueAccessor.ctorParameters = () => [
    { type: ElementRef, decorators: [{ type: Inject, args: [ElementRef,] }] },
    { type: Renderer2, decorators: [{ type: Inject, args: [Renderer2,] }] }
];
ContenteditableValueAccessor.propDecorators = {
    onInput: [{ type: HostListener, args: ['input',] }],
    onBlur: [{ type: HostListener, args: ['blur',] }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    ContenteditableValueAccessor.prototype.observer;
    /**
     * @type {?}
     * @private
     */
    ContenteditableValueAccessor.prototype.onTouched;
    /**
     * @type {?}
     * @private
     */
    ContenteditableValueAccessor.prototype.onChange;
    /**
     * @type {?}
     * @private
     */
    ContenteditableValueAccessor.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    ContenteditableValueAccessor.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudGVkaXRhYmxlLXZhbHVlLWFjY2Vzc29yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRpbmtvZmYvYW5ndWxhci1jb250ZW50ZWRpdGFibGUtYWNjZXNzb3IvIiwic291cmNlcyI6WyJsaWIvY29udGVudGVkaXRhYmxlLXZhbHVlLWFjY2Vzc29yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBRUgsU0FBUyxFQUNULFVBQVUsRUFDVixVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFFTixTQUFTLEdBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF1QixpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7OztBQW9CdkUsTUFBTSxPQUFPLDRCQUE0Qjs7Ozs7SUE0QnJDLFlBQ3lDLFVBQXNCLEVBQ3ZCLFFBQW1CO1FBRGxCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdkIsYUFBUSxHQUFSLFFBQVEsQ0FBVzs7Ozs7OztRQXRCbkQsYUFBUSxHQUFHLElBQUksZ0JBQWdCOzs7UUFBQyxHQUFHLEVBQUU7WUFDekMsVUFBVTs7O1lBQUMsR0FBRyxFQUFFO2dCQUNaLElBQUksQ0FBQyxRQUFRLENBQ1QsNEJBQTRCLENBQUMsWUFBWSxDQUNyQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQzFDLENBQ0osQ0FBQztZQUNOLENBQUMsRUFBQyxDQUFDO1FBQ1AsQ0FBQyxFQUFDLENBQUM7Ozs7UUFLSyxjQUFTOzs7UUFBRyxHQUFHLEVBQUUsR0FBRSxDQUFDLEVBQUM7Ozs7UUFLckIsYUFBUTs7O1FBQTRCLEdBQUcsRUFBRSxHQUFFLENBQUMsRUFBQztJQUtsRCxDQUFDOzs7Ozs7O0lBS0osZUFBZTtRQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFO1lBQ2pELGFBQWEsRUFBRSxJQUFJO1lBQ25CLFNBQVMsRUFBRSxJQUFJO1lBQ2YsT0FBTyxFQUFFLElBQUk7U0FDaEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7OztJQUtELFdBQVc7UUFDUCxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQy9CLENBQUM7Ozs7Ozs7OztJQVFELE9BQU87UUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxRQUFRLENBQ1QsNEJBQTRCLENBQUMsWUFBWSxDQUNyQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQzFDLENBQ0osQ0FBQztJQUNOLENBQUM7Ozs7Ozs7SUFNRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7Ozs7Ozs7Ozs7SUFPRCxVQUFVLENBQUMsS0FBb0I7UUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQ3JCLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUM3QixXQUFXLEVBQ1gsNEJBQTRCLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUNuRCxDQUFDO0lBQ04sQ0FBQzs7Ozs7Ozs7OztJQU9ELGdCQUFnQixDQUFDLFFBQWlDO1FBQzlDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzdCLENBQUM7Ozs7Ozs7Ozs7SUFPRCxpQkFBaUIsQ0FBQyxTQUFxQjtRQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUMvQixDQUFDOzs7Ozs7Ozs7O0lBT0QsZ0JBQWdCLENBQUMsUUFBaUI7UUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQ3RCLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUM3QixpQkFBaUIsRUFDakIsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQ3BCLENBQUM7SUFDTixDQUFDOzs7Ozs7Ozs7OztJQU9PLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBb0I7O2NBQ3RDLFNBQVMsR0FBRyxLQUFLLElBQUksRUFBRTtRQUU3QixPQUFPLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ3hELENBQUM7OztZQTFJSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUNKLGdHQUFnRztnQkFDcEcsU0FBUyxFQUFFO29CQUNQO3dCQUNJLE9BQU8sRUFBRSxpQkFBaUI7d0JBQzFCLFdBQVcsRUFBRSxVQUFVOzs7d0JBQUMsR0FBRyxFQUFFLENBQUMsNEJBQTRCLEVBQUM7d0JBQzNELEtBQUssRUFBRSxJQUFJO3FCQUNkO2lCQUNKO2FBQ0o7Ozs7WUExQkcsVUFBVSx1QkF3REwsTUFBTSxTQUFDLFVBQVU7WUFuRHRCLFNBQVMsdUJBb0RKLE1BQU0sU0FBQyxTQUFTOzs7c0JBMEJwQixZQUFZLFNBQUMsT0FBTztxQkFhcEIsWUFBWSxTQUFDLE1BQU07Ozs7Ozs7SUE3RHBCLGdEQVFHOzs7OztJQUtILGlEQUE2Qjs7Ozs7SUFLN0IsZ0RBQXFEOzs7OztJQUdqRCxrREFBMkQ7Ozs7O0lBQzNELGdEQUF1RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBBZnRlclZpZXdJbml0LFxyXG4gICAgRGlyZWN0aXZlLFxyXG4gICAgRWxlbWVudFJlZixcclxuICAgIGZvcndhcmRSZWYsXHJcbiAgICBIb3N0TGlzdGVuZXIsXHJcbiAgICBJbmplY3QsXHJcbiAgICBPbkRlc3Ryb3ksXHJcbiAgICBSZW5kZXJlcjIsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG4vKlxyXG4gKiBUaGlzIGlzIGEgYmFyZWJvbmVzIGNvbnRlbnRlZGl0YWJsZSB7QGxpbmsgQ29udHJvbFZhbHVlQWNjZXNzb3J9IGFsbG93aW5nIHlvdSB0byB1c2VcclxuICogQW5ndWxhciBmb3JtcyB3aXRoIG5hdGl2ZSBjb250ZW50ZWRpdGFibGUgSFRNTC4gRm9yIHNlY3VyaXR5IHJlYXNvbnMgeW91IG1pZ2h0IHdhbnRcclxuICogdG8gY29uc2lkZXIgc2FuaXRpemluZyBwYXN0ZWQvZHJvcHBlZCBjb250ZW50IGJlZm9yZSB1c2luZyBpdC4gQWxzbyBtYWtlIHN1cmUgdGhhdFxyXG4gKiB5b3UgZG8gbm90IHNldCBhbnkgZGFuZ2Vyb3VzIGNvbnRlbnQgYXMgY29udHJvbCB2YWx1ZSB5b3Vyc2VsZiwgYmVjYXVzZSBkaXJlY3RpdmVcclxuICoganVzdCBvdXRwdXRzIGNvbnRyb2wgdmFsdWUgYXMtaXMuXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOlxyXG4gICAgICAgICdbY29udGVudGVkaXRhYmxlXVtmb3JtQ29udHJvbE5hbWVdLCBbY29udGVudGVkaXRhYmxlXVtmb3JtQ29udHJvbF0sIFtjb250ZW50ZWRpdGFibGVdW25nTW9kZWxdJyxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IENvbnRlbnRlZGl0YWJsZVZhbHVlQWNjZXNzb3IpLFxyXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIENvbnRlbnRlZGl0YWJsZVZhbHVlQWNjZXNzb3JcclxuICAgIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XHJcbiAgICAvKlxyXG4gICAgICogTXV0YXRpb25PYnNlcnZlciBJRTExIGZhbGxiYWNrIChhcyBvcHBvc2VkIHRvIGlucHV0IGV2ZW50IGZvciBtb2Rlcm4gYnJvd3NlcnMpLlxyXG4gICAgICogV2hlbiBtdXRhdGlvbiByZW1vdmVzIGEgdGFnLCBpLmUuIGRlbGV0ZSBpcyBwcmVzc2VkIG9uIHRoZSBsYXN0IHJlbWFpbmluZyBjaGFyYWN0ZXJcclxuICAgICAqIGluc2lkZSBhIHRhZyDigJQgY2FsbGJhY2sgaXMgdHJpZ2dlcmVkIGJlZm9yZSB0aGUgRE9NIGlzIGFjdHVhbGx5IGNoYW5nZWQsIHRoZXJlZm9yZVxyXG4gICAgICogc2V0VGltZW91dCBpcyB1c2VkXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UoXHJcbiAgICAgICAgICAgICAgICBDb250ZW50ZWRpdGFibGVWYWx1ZUFjY2Vzc29yLnByb2Nlc3NWYWx1ZShcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5pbm5lckhUTUwsXHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLypcclxuICAgICAqIG9uVG91Y2ggY2FsbGJhY2sgdGhhdCBtYXJrcyBjb250cm9sIGFzIHRvdWNoZWQgYW5kIGFsbG93cyBGb3JtSG9va3MgdXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25Ub3VjaGVkID0gKCkgPT4ge307XHJcblxyXG4gICAgLypcclxuICAgICAqIG9uQ2hhbmdlIGNhbGxiYWNrIHRoYXQgd3JpdGVzIHZhbHVlIHRvIGNvbnRyb2wgYW5kIGFsbG93cyBGb3JtSG9va3MgdXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkID0gKCkgPT4ge307XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgQEluamVjdChFbGVtZW50UmVmKSBwcml2YXRlIHJlYWRvbmx5IGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXHJcbiAgICAgICAgQEluamVjdChSZW5kZXJlcjIpIHByaXZhdGUgcmVhZG9ubHkgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgICkge31cclxuXHJcbiAgICAvKlxyXG4gICAgICogVG8gc3VwcG9ydCBJRTExIE11dGF0aW9uT2JzZXJ2ZXIgaXMgdXNlZCB0byBtb25pdG9yIGNoYW5nZXMgdG8gdGhlIGNvbnRlbnRcclxuICAgICAqL1xyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIHRoaXMub2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJEYXRhOiB0cnVlLFxyXG4gICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgIHN1YnRyZWU6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICAqIERpc2Nvbm5lY3QgTXV0YXRpb25PYnNlcnZlciBJRTExIGZhbGxiYWNrIG9uIGRlc3Ryb3lcclxuICAgICAqL1xyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZlci5kaXNjb25uZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICAqIExpc3RlbiB0byBpbnB1dCBldmVudHMgdG8gd3JpdGUgaW5uZXJIVE1MIHZhbHVlIGludG8gY29udHJvbCxcclxuICAgICAqIGFsc28gZGlzY29ubmVjdCBNdXRhdGlvbk9ic2VydmVyIGFzIGl0IGlzIG5vdCBuZWVkZWQgaWYgdGhpc1xyXG4gICAgICogZXZlbnQgd29ya3MgaW4gY3VycmVudCBicm93c2VyXHJcbiAgICAgKi9cclxuICAgIEBIb3N0TGlzdGVuZXIoJ2lucHV0JylcclxuICAgIG9uSW5wdXQoKSB7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZlci5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZShcclxuICAgICAgICAgICAgQ29udGVudGVkaXRhYmxlVmFsdWVBY2Nlc3Nvci5wcm9jZXNzVmFsdWUoXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5pbm5lckhUTUwsXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgICogTGlzdGVuIHRvIGJsdXIgZXZlbnQgdG8gbWFyayBjb250cm9sIGFzIHRvdWNoZWRcclxuICAgICAqL1xyXG4gICAgQEhvc3RMaXN0ZW5lcignYmx1cicpXHJcbiAgICBvbkJsdXIoKSB7XHJcbiAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmVhY3RzIHRvIGV4dGVybmFsIGNoYW5nZVxyXG4gICAgICpcclxuICAgICAqIEBzZWUge0BsaW5rIENvbnRyb2xWYWx1ZUFjY2Vzc29yI3dyaXRlVmFsdWV9XHJcbiAgICAgKi9cclxuICAgIHdyaXRlVmFsdWUodmFsdWU6IHN0cmluZyB8IG51bGwpIHtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCxcclxuICAgICAgICAgICAgJ2lubmVySFRNTCcsXHJcbiAgICAgICAgICAgIENvbnRlbnRlZGl0YWJsZVZhbHVlQWNjZXNzb3IucHJvY2Vzc1ZhbHVlKHZhbHVlKSxcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZWdpc3RlcnMgb25DaGFuZ2UgY2FsbGJhY2tcclxuICAgICAqXHJcbiAgICAgKiBAc2VlIHtAbGluayBDb250cm9sVmFsdWVBY2Nlc3NvciNyZWdpc3Rlck9uQ2hhbmdlfVxyXG4gICAgICovXHJcbiAgICByZWdpc3Rlck9uQ2hhbmdlKG9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBvbkNoYW5nZTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmVnaXN0ZXJzIG9uVG91Y2ggY2FsbGJhY2tcclxuICAgICAqXHJcbiAgICAgKiBAc2VlIHtAbGluayBDb250cm9sVmFsdWVBY2Nlc3NvciNyZWdpc3Rlck9uVG91Y2hlZH1cclxuICAgICAqL1xyXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQob25Ub3VjaGVkOiAoKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBvblRvdWNoZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICAqIFNldHMgZGlzYWJsZWQgc3RhdGUgYnkgc2V0dGluZyBjb250ZW50ZWRpdGFibGUgYXR0cmlidXRlIHRvIHRydWUvZmFsc2VcclxuICAgICAqXHJcbiAgICAgKiBAc2VlIHtAbGluayBDb250cm9sVmFsdWVBY2Nlc3NvciNzZXREaXNhYmxlZFN0YXRlfVxyXG4gICAgICovXHJcbiAgICBzZXREaXNhYmxlZFN0YXRlKGRpc2FibGVkOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoXHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LFxyXG4gICAgICAgICAgICAnY29udGVudGVkaXRhYmxlJyxcclxuICAgICAgICAgICAgU3RyaW5nKCFkaXNhYmxlZCksXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgICogbnVsbCBhbmQgb3RoZXIgZmFsc3kgY29udHJvbCB2YWx1ZXMgYXJlIHRyZWF0ZWQgYXMgZW1wdHkgc3RyaW5nIHRvXHJcbiAgICAgKiBwcmV2ZW50IElFMTEgb3V0cHV0dGluZyAnbnVsbCcsIGFsc28gc2luZ2xlIDxicj4gaXMgcmVwbGFjZWQgd2l0aCBlbXB0eVxyXG4gICAgICogc3RyaW5nIHdoZW4gcGFzc2VkIHRvIHRoZSBjb250cm9sXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHByb2Nlc3NWYWx1ZSh2YWx1ZTogc3RyaW5nIHwgbnVsbCk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgcHJvY2Vzc2VkID0gdmFsdWUgfHwgJyc7XHJcblxyXG4gICAgICAgIHJldHVybiBwcm9jZXNzZWQudHJpbSgpID09PSAnPGJyPicgPyAnJyA6IHByb2Nlc3NlZDtcclxuICAgIH1cclxufVxyXG4iXX0=