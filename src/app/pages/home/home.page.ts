import { Component } from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {EditPasswordComponent} from '../../edit-password/edit-password.component';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    items: any = [];

    private nextId: number;

    constructor(private popoverCtrl: PopoverController, private storage: Storage) {

        this.storage.get('onePass.stored_passwords').then((data) => {

            this.items = !data ? [] : data;

            this.nextId = !data ? 1 : Number(this.items[this.items.length - 1].id) + 1;

            /*if(!data){
                this.items = [];
            }
            else{
                this.items = data;
            }*/
        })

    }

    async openPopover(data = null){

        const popoverElement = await this.popoverCtrl.create({
            component: EditPasswordComponent,
            componentProps: {
                data: data,
                id: (data && data.id) ? data.id : this.nextId
            }
        });

        popoverElement.onDidDismiss().then((returnedData) => {

            if(returnedData.data){

                let item = returnedData.data;

                if(item.oldData){

                    this.items.forEach((value) => {
                        if(value.id == item.id){
                            value = item
                        }
                    });

                    this.storage.set('onePass.stored_passwords', this.items);

                }
                else{

                    delete item['oldData'];

                    this.items.push(item);

                    this.nextId++;
                    this.storage.set('onePass.stored_passwords', this.items);
                }

            }

        });

        return await popoverElement.present();

    }

    deleteItem(item){
        this.items = this.items.filter((el) => {
            return el.id !== item.id;
        });

        this.storage.set('onePass.stored_passwords', this.items);
    }

}
