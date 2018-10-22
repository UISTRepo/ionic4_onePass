import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    public alreadySigned = 1;

    constructor(private navCtrl: NavController){ }

    ngOnInit(){

        this.alreadySigned === 1 ? true : false;

    }

    login() {
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
