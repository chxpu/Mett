import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {PracticePage} from "../practice/practice";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = PracticePage;
  tab3Root = ContactPage;

  constructor() {

  }
}
