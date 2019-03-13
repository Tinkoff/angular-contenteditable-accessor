import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ContenteditableValueAccessorModule} from '@tinkoff/angular-contenteditable-accessor';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        ContenteditableValueAccessorModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
