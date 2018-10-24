import { Component } from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {EditPasswordComponent} from '../../edit-password/edit-password.component';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    items: any = [];

    constructor(private popoverCtrl: PopoverController) {

        let item1 = {
            id: 1,
            title: 'Facebook',
            user: '123@123.com',
            pass: '111111'
        };

        this.items.push(item1);

        let item2 = {
            id: 2,
            title: 'GMail',
            user: 'asd@asd.com',
            pass: '111111'
        };

        this.items.push(item2);

    }

    addItem(){

        let item2 = {
            id: 1,
            title: 'New item',
            user: 'email@email.com',
            pass: 'PPPPPPP'
        };

        this.items.push(item2);

    }

    async openPopover(data = null){

        const popoverElement = await this.popoverCtrl.create({
            component: EditPasswordComponent,
            componentProps: {
                data: data
            }
        });
        return await popoverElement.present();

    }

}
