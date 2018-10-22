import { Component, OnInit } from '@angular/core';
import {NavParams} from '@ionic/angular';

@Component({
    selector: 'app-edit-password',
    templateUrl: './edit-password.component.html',
    styleUrls: ['./edit-password.component.scss']
})
export class EditPasswordComponent implements OnInit {

    showPassword = false;
    openedOldEntry: boolean;

    data: any = {};

    constructor(private navParams: NavParams) {
        this.openedOldEntry = this.navParams.get('data') ? true : false;
    }

    ngOnInit() {
        if(this.navParams.get('data')){
            this.data = this.navParams.get('data');
        }
        else{
            this.data = {};
        }
    }

    saveInfo(){

        if(this.openedOldEntry){
            console.log('save data');
        }
        else{
            console.log('create new');
        }

    }
}
