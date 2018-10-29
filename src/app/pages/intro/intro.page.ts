import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import {NavController, Platform} from '@ionic/angular';

@Component({
    selector: 'app-intro',
    templateUrl: './intro.page.html',
    styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

    private slides;

    constructor(
        private storage: Storage,
        private navCtrl: NavController,
        private platform: Platform
    ) {

    }

    ngOnInit() {

        this.slides = document.querySelector('ion-slides');
        this.slides.options = {
            effect: 'flip'
        };
    }

    goNext() {
        this.slides.slideNext();
    }

    setOpenedIntro(){

        this.storage.set('onePass.opened_slides', true);

    }

}
