import { Component, OnInit } from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    public alreadySigned = 1;

    pass: string = '123456';

    constructor(private navCtrl: NavController, public toastController: ToastController){ }

    ngOnInit(){

        this.alreadySigned === 1 ? true : false;

    }

    async presentToast(message) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000
        });
        toast.present();
    }

    login() {

        // validate the input
        if(this.pass.length < 6){

            this.presentToast('The password should be at least 6 chars');
            return;
        }

        if(this.alreadySigned){
            console.log('compare the password agains the stored one');
        }
        else {
           console.log('store the new password');
        }

        this.navCtrl.navigateRoot('/home');
    }

    checkFingerprint(){
        console.log('check fingerptint');

        this.navCtrl.navigateRoot('/home');
    }

}
