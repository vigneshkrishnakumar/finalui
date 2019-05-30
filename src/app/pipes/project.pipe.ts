import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'projectfilter'
})
export class ProjectPipe implements PipeTransform {

    transform(value: Array<any>, 
        project?: string) {

        if(project.trim() == ''){
            return value;
        }

        if(project.trim() != '') {
            let filteredProjects = value.filter(val => {
                return val.project.includes(project)
            });
            return filteredProjects
        } 
    }

}