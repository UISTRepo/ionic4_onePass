import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-intro',
    templateUrl: './intro.page.html',
    styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

    private slides;

    constructor() {
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

}
