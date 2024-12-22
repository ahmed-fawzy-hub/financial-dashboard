import { Routes } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { InstrumentListComponent } from './instrument-list/instrument-list.component';
import { InstrumentDetailsComponent } from './instrument-details/instrument-details.component';

export const routes: Routes = [
   
    { path: 'instruments', component: InstrumentListComponent },
    
    { path: '', component: HomeComponent },
  { path: 'details/:symbol', component: InstrumentDetailsComponent },
 // مسار التفاصيل
];
