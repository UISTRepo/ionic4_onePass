import { Component } from '@angular/core';

import {NavController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private navCtrl: NavController
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // this.statusBar.styleDefault();
            this.splashScreen.hide();

            this.platform.resume.subscribe(() => {
                this.navCtrl.navigateRoot('/login');
            });

            this.platform.backButton.subscribe(() => {
                // todo: exit the app
                console.log('exit app');
                navigator['app'].exitApp();
            });

        });
    }
}
