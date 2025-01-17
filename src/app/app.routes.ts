import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FormProductoComponent } from './components/producto/form-producto/form-producto.component';

export const routes: Routes = [

    { path: 'home', component: HomeComponent},
    { path: 'form-producto', component: FormProductoComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },

    // { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
    // { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
    // { path: 'contact', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule) },
    // { path: '**', redirectTo: 'home' } // catch-all route for unknown paths
];
