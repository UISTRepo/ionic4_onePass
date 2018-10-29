import { NgModule } from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';
import {NavController, Platform} from '@ionic/angular';
import {Storage} from '@ionic/storage';

const routes: Routes = [
    // { path: '', redirectTo: 'intro', pathMatch: 'full' },
    { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
    { path: 'intro', loadChildren: './pages/intro/intro.module#IntroPageModule' },
    { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

    constructor(private navCtrl: NavController, private platform: Platform, private storage: Storage) {

        this.platform.ready().then(() => {
            this.storage.get('onePass.opened_slides').then((data) => {

                if(data){
                    this.navCtrl.navigateRoot('/login');
                }
                else{
                    this.navCtrl.navigateRoot('/intro');
                }

            })
        })

    }

}
