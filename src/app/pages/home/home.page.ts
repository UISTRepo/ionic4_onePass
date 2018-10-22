import { Component } from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {EditPasswordComponent} from '../../edit-password/edit-password.component';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor(private popoverCtrl: PopoverController) {

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
