import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { Student } from '../models/Student.model';

@Injectable()
export class StudentService{

    constructor(private http: HttpClient) { }
    API_PATH = 'student';
    getStudents() {
        let newData: Student = {};
        return this.http.get<any>(`${environment.urlBaseApi}${this.API_PATH}`)
        .pipe(map(res => {
            return res?.students?.map((item: Student) =>{
                 return newData = item
            })
        }));
    }
    
    postBasic(requestBasic: Student){
        return this.http.post<any>(`${environment.urlBaseApi}${this.API_PATH}`,
        {
            username: requestBasic.Username,
            firstName: requestBasic.FirstName,
            lastName: requestBasic.LastName,
            age: requestBasic.Age,
            career: requestBasic.Career
        })
        .pipe(map(user => {
                if (user.studenInserted?.id !== '' && user.studenInserted?.id != null) {
                    return user.studenInserted; 
                }
        }));
}

putBasic(requestBasic: Student){
    return this.http.put<any>(`${environment.urlBaseApi}${this.API_PATH}`,
    {
            id: requestBasic.id,
            username: requestBasic.Username,
            firstName: requestBasic.FirstName,
            lastName: requestBasic.LastName,
            age: requestBasic.Age,
            career: requestBasic.Career
      })
    .pipe(map(user => {
            if (user.studenUpdated?.id !== 0 && user.studenUpdated?.id != null) {
                return user.studenUpdated; 
            }
        }));
}


delete(id: number){
    return this.http.delete<any>(`${environment.urlBaseApi}${this.API_PATH}/${id}`)
        .pipe(map(client => {
            if (client.studentDeleted) {
                return client.studentDeleted; 
            }
        }));
}
    
}