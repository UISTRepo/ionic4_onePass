import {Component, OnInit} from '@angular/core';
import {NavParams, PopoverController, ToastController} from '@ionic/angular';

@Component({
    selector: 'app-edit-password',
    templateUrl: './edit-password.component.html',
    styleUrls: ['./edit-password.component.scss']
})
export class EditPasswordComponent implements OnInit {

    showPassword = false;
    openedOldEntry: boolean;

    data: any = {};
    private id: number;

    constructor(
        private navParams: NavParams,
        public toastController: ToastController,
        private popoverController: PopoverController
    ) {
        this.openedOldEntry = this.navParams.get('data') ? true : false;
    }

    ngOnInit() {

        this.id = this.navParams.get('id');

        if(this.navParams.get('data')){
            this.data = this.navParams.get('data');
        }
        else{
            this.data = {};
        }
    }

    async presentToast(message) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000
        });
        toast.present();
    }

    saveInfo(){

        if(!this.data.title){
            this.presentToast('Enter Title');
            return;
        }

        if(this.data.title.length < 2){
            this.presentToast('The Title should be at least 2 chars');
            return;
        }

        if(!this.data.user){
            this.presentToast('Enter User');
            return;
        }

        if(this.data.user.length < 2){
            this.presentToast('The User should be at least 2 chars');
            return;
        }

        if(!this.data.pass){
            this.presentToast('Enter Password');
            return;
        }

        if(this.data.pass.length < 2){
            this.presentToast('The Password should be at least 2 chars');
            return;
        }

        let item: any = {
            id: this.id,
            title: this.data.title,
            user: this.data.user,
            pass: this.data.pass,
            oldData: this.openedOldEntry
        };

        this.popoverController.dismiss(item);

    }
}
