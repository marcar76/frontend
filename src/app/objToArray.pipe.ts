import { Pipe, PipeTransform } from "@angular/core";
import { skills } from "./model/skills.model";

@Pipe({
name:'ObjToArray'
})

export class ObjToArrayPipe implements PipeTransform{
    transform(object: any = []): any {
        return Object.values(object);
        
    }
}