import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'userfilter'
})
export class UserPipe implements PipeTransform {

    transform(value: Array<any>, 
        firstName?: string) {

        if(firstName.trim() == ''){
            return value;
        }

        if(firstName.trim() != '') {
            let filteredUsers = value.filter(val => {
                return val.firstName.includes(firstName)
            });
            return filteredUsers
        } 
    }

}