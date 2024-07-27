import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent}
    // { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
    // { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
    // { path: 'contact', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule) },
    // { path: '**', redirectTo: 'home' } // catch-all route for unknown paths
];
