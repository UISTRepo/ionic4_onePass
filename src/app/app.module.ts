import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import {FormsModule} from '@angular/forms';

import { IonicStorageModule } from '@ionic/storage';
import {AndroidFingerprintAuth} from '@ionic-native/android-fingerprint-auth/ngx';

@NgModule({
    declarations: [AppComponent, EditPasswordComponent],
    entryComponents: [EditPasswordComponent],
    imports: [
        IonicStorageModule.forRoot(),
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        FormsModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        AndroidFingerprintAuth
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
