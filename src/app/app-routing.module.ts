import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    { path: '', pathMatch: 'full', redirectTo: 'student' },
    { path: 'student', loadChildren: () => import('./ui/components/student/student.module').then(m => m.StudentModule) },
], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
