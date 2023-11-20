import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudentComponent } from './student.component';



@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: StudentComponent }
	])],
	exports: [RouterModule]
})

export class StudentRoutingModule { }
