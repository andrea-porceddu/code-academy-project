import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Edition } from 'src/app/DTOs/edition';
import { Area } from "src/app/DTOs/area";
import { Course } from "src/app/DTOs/course";
import { Student } from "src/app/DTOs/student";
import { Teacher } from "src/app/DTOs/teacher";


@Injectable({
  providedIn: 'root'
})
export class DidactisService {
  private baseUrl = 'https://localhost:5001/api/';
  private courseUrl = this.baseUrl + 'course';
  private studentUrl = this.baseUrl + 'student';
  private courseEditionUrl = this.baseUrl + 'courseEdition';
  private teacherUrl = this.baseUrl + 'instructor'
  constructor(private http: HttpClient) {
    this.http = http;
  }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.courseUrl)
      .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getCourseById(id: Number): Observable<Course> {
    return this.http.get<Course>(`${this.courseUrl}/${id}`)
      .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(`${this.courseUrl}/areas`)
      .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getAreaById(id: Number): Observable<Area> {
    return this.http.get<Area>(`${this.courseUrl}/${id}/area`)
      .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createCourse(course: Course): Observable<Course> {
    const hs = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this.http.post<Course>(this.courseUrl, course, { headers: hs })
      .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError));
  }

  updateCourse(course: Course): Observable<Course> {
    const hs = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this.http.put<Course>(this.courseUrl, course, { headers: hs })
      .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError));
  }

  deleteCourse(id: number): Observable<Course> {
    return this.http.delete<Course>(`${this.courseUrl}/${id}`)
      .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError));
  }

  getEditionsByCourseId(id: number): Observable<Edition[]> {
    return this.http.get<Edition[]>(`${this.courseEditionUrl}/course/${id}`)
      .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getEditionById(id: Number): Observable<Edition> {
    return this.http.get<Edition>(`${this.courseEditionUrl}/${id}`)
      .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createEdition(edition: Edition): Observable<Edition> {
    const hs = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this.http.post<Edition>(this.courseEditionUrl, edition, { headers: hs })
      .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteEdition(id: Number): Observable<Edition> {
    return this.http.delete<Edition>(`${this.courseEditionUrl}/${id}`)
      .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError));
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentUrl)
      .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createStudent(student: Student): Observable<Student> {
    const hs = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this.http.post<Student>(this.studentUrl, student, { headers: hs })
      .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError));
  }

  getStudentById(id: Number): Observable<Student> {
    return this.http.get<Student>(`${this.studentUrl}/${id}`)
      .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  updateStudent(student: Student): Observable<Student> {
    const hs = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this.http.put<Student>(this.studentUrl, student, { headers: hs })
      .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError));
  }

  deleteStudent(id: Number): Observable<Student> {
    return this.http.delete<Student>(`${this.studentUrl}/${id}`)
      .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError));
  }

  createTeacher(teacher: Teacher): Observable<Teacher> {
    const hs = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this.http.post<Teacher>(this.teacherUrl, teacher, { headers: hs })
      .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError));
  }

  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.teacherUrl)
      .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getTeacherById(id: Number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.teacherUrl}/${id}`)
      .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  updateTeacher(teacher: Teacher): Observable<Teacher> {
    const hs = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this.http.put<Teacher>(this.teacherUrl, teacher, { headers: hs })
      .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError));
  }

  deleteTeacher(id: number): Observable<Teacher> {
    return this.http.delete<Teacher>(`${this.teacherUrl}/${id}`)
      .pipe(tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<never> { //lancia un'eccezione
    let errorMessage = '';
    if (errorResponse.error instanceof ErrorEvent) {
      errorMessage = 'errore di rete: ' + errorResponse.error.message;
    } else {
      errorMessage = 'errore lato server: ' + errorResponse.status + '' + errorResponse.message;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}


