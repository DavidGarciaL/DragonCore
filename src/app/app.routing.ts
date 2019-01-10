import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LayoutComponent } from './components/shared/layout/layout.component';
import { LAYOUT_ROUTES } from './components/shared/layout/layout.routing';

const ROUTES: Routes = [
    { 
        path: '', 
        component: LayoutComponent,
        children: LAYOUT_ROUTES
    },
    { path: '**', component: LayoutComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})
export class RoutingModule {}
