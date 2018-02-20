import { Component } from '@angular/core';

import { CreatePage } from '../create/create';
import { AdminPage } from '../admin/admin';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CreatePage;
  tab3Root = AdminPage;

  constructor() {

  }
}
