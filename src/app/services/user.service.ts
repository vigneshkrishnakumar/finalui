import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  tasks: string[] = [];
    private server: string = `http://localhost:8090/user`;
    constructor(private http : Http) {}

    fetchUsers(): Promise<any> {
        return this.http.get(`${this.server}/fetchUsers`)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(err => err);
    }

    getUser(userId : number): Promise<any> {
        return this.http.get(`${this.server}/getUser/${userId}`)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(err => err);
    }

    addUser(user: string): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
      return this.http.post(`${this.server}/saveUser`, user, options)
          .toPromise()
          .then(response => {
              return response.json();
          })
          .catch(err => err);
    }

    updateUser(user: string, id : number): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(`${this.server}/updateUser/${id}`, user, options)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(err => err);
    }

    deleteUser(userId : number): Promise<any> {
        return this.http.delete(`${this.server}/deleteUser/${userId}`)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(err => err);
    }
}