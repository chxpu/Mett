import { Component, ViewChild } from '@angular/core';

import {App, MenuController, NavController, Slides} from 'ionic-angular';

import { Storage } from '@ionic/storage';
import {LoginPage} from "../login/login";


@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})

export class TutorialPage {
  showSkip = true;

  @ViewChild('slides') slides: Slides;

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public storage: Storage,
    public app: App
  ) { }

  startApp() {
    this.app.getRootNav().setRoot(LoginPage).then(() => {
      this.storage.set('hasSeenTutorial', 'true');
    })
  }

  onSlideChangeStart(slider: Slides) {
    if ( slider.isEnd() ) {
      this.slides.stopAutoplay();
    }
    this.showSkip = !slider.isEnd();
  }

  ionViewWillEnter() {
    this.slides.update();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
