import {Component, OnInit} from '@angular/core';
import {NavController, Platform, ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    public alreadySigned;

    pass: string;

    constructor(
        private navCtrl: NavController,
        public toastController: ToastController,
        private storage: Storage,
        private platform: Platform
    ){ }

    ngOnInit(){

        this.platform.ready().then(() => {
            this.storage.get('onePass.master_password').then((data) => {

                this.alreadySigned = data ? true : false;

            })
        })
    }

    async presentToast(message) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000
        });
        toast.present();
    }

    login() {

        if(!this.pass){
            this.presentToast('Enter your password');
            return;
        }

        // validate the input
        if(this.pass.length < 6){

            this.presentToast('The password should be at least 6 chars');
            return;
        }

        if(this.alreadySigned){

            this.storage.get('onePass.master_password').then((password) => {

                if(this.pass !== password){
                    this.presentToast('The password is wrong');
                    return;
                }
                else{
                    this.navCtrl.navigateRoot('/home');
                }

            });

        }
        else {
            this.storage.set('onePass.master_password', this.pass);

            this.navCtrl.navigateRoot('/home');
        }

    }

    checkFingerprint(){
        console.log('check fingerptint');

        this.navCtrl.navigateRoot('/home');
    }

}
