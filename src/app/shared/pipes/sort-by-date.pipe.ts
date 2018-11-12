import { PipeTransform, Pipe } from "../../../../node_modules/@angular/core";
import * as moment from 'moment';

@Pipe({
    name: 'orderBYdate'
})
export class OrderByDatePipe implements PipeTransform {
    transform(records: Array<any>, direction?: any){
        records.sort((aa: any, bb: any) => {
            let a = moment(aa.creationDate);
            let b = moment(bb.creationDate);

            let dir = direction == 'desc' ? -1 : 1;

            if(a < b) {
                return -1 * dir;
            } else if(a > b) {
                return 1 * dir;
            } else {
                return 0;
            }
        });
        return records;
    }
}