import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'usersortfilter'
})
export class UserSortPipe implements PipeTransform {

    transform(taskdets: Array<any>, args: string): Array<any> {
        if (args && taskdets.length) {
          if (args == 'firstName') {
            return taskdets.sort(function (a, b) {
                var nameA=a.firstName.toLowerCase(), nameB=b.firstName.toLowerCase()
                if (nameA < nameB) //sort string ascending
                    return -1 
                if (nameA > nameB)
                    return 1
                return 0 //default return value (no sorting)
              }
              );
          }
          if (args == 'lastName') {
            return taskdets.sort(function (a, b) {
              var nameA=a.lastName.toLowerCase(), nameB=b.lastName.toLowerCase()
              if (nameA < nameB) //sort string ascending
                  return -1 
              if (nameA > nameB)
                  return 1
              return 0 //default return value (no sorting)
            }
            );
          }

          if (args == 'empId') {
            return taskdets.sort(function (a, b) {
                return a.empId - b.empId;
              }
            );
          }
    
        } else {
    
          return taskdets;
        }
      }
}
