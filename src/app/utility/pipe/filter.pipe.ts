import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'filter',
})
export class FilterPipe implements PipeTransform{
    transform(value: any, filterString: string): any {
        console.log(value, 'filterd value')
        const resultArray:any = [];
        // return whole array if filter string is empty of undefined
        if(!filterString){
            return value;
        }
        else{
            for(const item of value){
                // return true if first_name includes a substring
                if(item.firstName.toLowerCase().startsWith(filterString.toLowerCase())){
                    resultArray.push(item);
                }
            }
            return resultArray;
        }
    }
}