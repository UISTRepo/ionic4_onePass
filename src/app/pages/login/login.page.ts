import {Component, OnInit} from '@angular/core';
import {NavController, Platform, ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth/ngx';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    loginForm: FormGroup;

    public alreadySigned;

    pass: string;
    user: string;

    isFingerprintAvailable: boolean = false;

    constructor(
        private navCtrl: NavController,
        public toastController: ToastController,
        private storage: Storage,
        private platform: Platform,
        private formBuilder: FormBuilder,
        private androidFingerprintAuth: AndroidFingerprintAuth
    ){ }

    ngOnInit(){

        this.platform.ready().then(() => {
            this.storage.get('onePass.master_password').then((data) => {

                this.alreadySigned = data ? true : false;

            });

            if(this.platform.is('cordova') && this.platform.is('android')){
                this.androidFingerprintAuth.isAvailable().then(() => {
                    this.isFingerprintAvailable = true;
                }, (error) => {
                    this.isFingerprintAvailable = false;
                }).catch(error => {
                    this.isFingerprintAvailable = false;
                });
            }
            else{
                this.isFingerprintAvailable = false;
            }


        });

        this.loginForm = this.formBuilder.group({
            password: ['', [
                Validators.required,
                Validators.minLength(5)
            ]]
            // email: ['', [
            //     Validators.required,
            //     Validators.email
            // ]]
        });
    }

    async presentToast(message) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000
        });
        toast.present();
    }

    login() {

        // if(!this.loginForm.controls.email.valid){
        //     this.presentToast('Enter your email');
        //     return;
        // }

        if(!this.loginForm.controls.password.valid){
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

        this.androidFingerprintAuth.encrypt({
            clientId: 'myAppName',
            username: 'myUsername',
            password: 'myPassword'
        })
            .then(result => {
                if (result.withFingerprint) {
                    this.navCtrl.navigateRoot('/home');
                } else if (result.withBackup) {
                    this.navCtrl.navigateRoot('/home');
                } else {
                    this.presentToast('Im not letting you in');
                }
            })
            .catch(error => {
                if (error === this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
                    this.presentToast('Action cancelled');
                } else console.error(error)
            });

    }

}
