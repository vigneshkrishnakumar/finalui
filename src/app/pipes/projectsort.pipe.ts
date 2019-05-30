import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'projectsortfilter'
})
export class ProjectSortPipe implements PipeTransform {

    transform(taskdets: Array<any>, args: string): Array<any> {
        if (args && taskdets.length) {
          if (args == 'projectStartDate') {
            return taskdets.sort(function (a, b) {
                return <any> new Date (a.startDate) - <any> new Date (b.startDate);
              }
              );
          }
          if (args == 'projectEndDate') {
            return taskdets.sort(function (a, b) {
                return <any> new Date (a.endDate) - <any> new Date (b.endDate);
              }
              );
          }
          if (args == 'projectPriority') {
            return taskdets.sort(function (a, b) {
              return a.priority - b.priority;
            }
            );
          }
          if (args == 'projectCompleted') {
            return taskdets.sort(function (a, b) {
                return a.compTasks - b.compTasks;
              }
            );
          }
    
        } else {
    
          return taskdets;
        }
      }
}
