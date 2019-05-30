import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  tasks: string[] = [];
    private server: string = `http://localhost:8090/project`;
    constructor(private http : Http) {}

    fetchProjects(): Promise<any> {
        return this.http.get(`${this.server}/fetchProjects`)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(err => err);
    }

    getProject(projectId : number): Promise<any> {
        return this.http.get(`${this.server}/getProject/${projectId}`)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(err => err);
    }

    addProject(project: string): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
      return this.http.post(`${this.server}/saveProject`, project, options)
          .toPromise()
          .then(response => {
              return response.json();
          })
          .catch(err => err);
    }

    updateProject(project: string, id : number): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(`${this.server}/updateProject/${id}`, project, options)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(err => err);
    }

    deleteProject(projectId : number): Promise<any> {
        return this.http.delete(`${this.server}/deleteProject/${projectId}`)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(err => err);
    }
}