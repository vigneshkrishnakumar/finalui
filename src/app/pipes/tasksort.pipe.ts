import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tasksortfilter'
})
export class TaskSortPipe implements PipeTransform {

    transform(taskdets: Array<any>, args: string): Array<any> {
        if (args && taskdets.length) {
          if (args == 'taskStartDate') {
            return taskdets.sort(function (a, b) {
                return <any> new Date (a.startDate) - <any> new Date (b.startDate);
              }
              );
          }
          if (args == 'taskEndDate') {
            return taskdets.sort(function (a, b) {
                return <any> new Date (a.endDate) - <any> new Date (b.endDate);
            }
              );
          }
          if (args == 'taskPriority') {
            return taskdets.sort(function (a, b) {
              return a.priority - b.priority;
            }
            );
          }
          if (args == 'taskCompleted') {
            return taskdets.sort(function (a, b) {
                return <any> new Date (a.endDate) - <any> new Date (b.endDate);
              }
             );
          }
    
        } else {
    
          return taskdets;
        }
      }
}
