import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../models/Student.model';
import { StudentService } from '../../service/Student.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  cols: any[] = [];
  formStudent!: FormGroup;
  students: Student[] = [];
  studentDialog: boolean = false;
  deleteDialog: boolean = false;
  action: string = "";
  submittedBasic: boolean = false;
  editMode: boolean = false;
  studentId: number = 0;
  constructor( 
    private studentService: StudentService,    
    private formBuilder: FormBuilder,
    private messageService: MessageService) {
   
  }

  ngOnInit() {
    this.getGridData();

    this.cols = [
        { field: 'username', header: 'UserName' },
        { field: 'firstName', header: 'First Name' },
        { field: 'lastName', header: 'Last Name' },
        { field: 'age', header: 'Age' },
        { field: 'career', header: 'Career' },
    ];

    this.formStudent = this.formBuilder.group({
      username: ['',[Validators.required]],
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      age: ['',[Validators.required]],
      career: ['',[Validators.required]]
     });

 }

  getGridData(){
    this.studentService.getStudents()
    .subscribe({
        next: (data:any) => {
          this.students = data;
        },
        error: error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.details, life: 5000 });
        }
    });
  }

  openNew(){
    this.studentDialog = true;
    this.action = "Create";
    this.submittedBasic = false;
    this.formStudent.reset();
  }

  saveStudent(){
    this.submittedBasic = true;
    if (this.formStudent.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'All fields must be filled in', life: 5000 });
      return;
    }
    let formValues  = this.f;
    let obj: Student = {
      Username : formValues.username.value,
      FirstName : formValues.firstName.value,
      LastName : formValues.lastName.value,
      Age : formValues.age.value,
      Career : formValues.career.value
    }
    if (this.editMode){
      obj.id = this.studentId;
      this.updateStudent(obj);
    }else
    {
      this.createStudent(obj);
    }
  }


    updateStudent(objStudent: Student){
      this.studentService.putBasic(objStudent)
      .subscribe({
          next: (data) => {
            if(data !== null)
            {
              this.studentDialog = false;
              this.getGridData();
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Student Updated', life: 3000 });
            }
          },
          error: error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 5000 });
          }
      });
    }

    createStudent(objStudent: Student){
      this.studentService.postBasic(objStudent)
              .subscribe({
                  next: (data) => {
                    if(data !== null)
                    {
                      this.studentDialog = false;
                      this.getGridData();
                      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Student Saved', life: 3000 });
                    }
                  },
                  error: error => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.detail, life: 5000 });
                    console.log(error);
                  }
              });
      }
  
  

  deleteStudent(id:number){
    this.deleteDialog = true;
    this.studentId = id;
  }

  confirmDeleteSelected()
  {
   this.studentService.delete(this.studentId)
               .subscribe({
                   next: (data) => {
                     if(data !== null)
                     {
                       if(data)
                       {
                         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Student Deleted', life: 3000 });
                         this.deleteDialog = false; 
                         this.getGridData();
                       }else
                       {
                         this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Record could not be removed', life: 3000 });
                       }
                     }
                   },
                   error: error => {
                     this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.error?.detail, life: 5000 });
                     console.log(error);
                   }
               });
   
  }

  editStudent(studentEdit: any){
    this.studentDialog = true;
    this.editMode = true;
    this.formStudent = this.formBuilder.group({
      username: [studentEdit.username, [Validators.required]],
      firstName: [studentEdit.firstName, [Validators.required]],
      lastName: [studentEdit.lastName, [Validators.required]],
      age: [studentEdit.age, [Validators.required]],
      career: [studentEdit.career, [Validators.required]]
  })
    this.action= "Edit";
    this.studentId = studentEdit.id as number;
  }

  get f() { return this.formStudent?.controls; }
}
