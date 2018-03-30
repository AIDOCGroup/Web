import { Route, Page } from "../page";
import { HttpService } from './../../service/http';
import { Moment } from './../../util';
import { ArchiveEditModal } from "./modal/edit";

@Route('/statistics', 'statistics', require('./statistics.jade')())
export class StatisticsPage extends Page {

    statics: any = [];


    page: {
        size: number,
        count: number,
        current: number,
    } = {
        size: 10,
        count: 0,
        current: 1
    }
    orders(order){
        this.loadData(order);
    }

    pageInit(uibModal?: any) {


        this.setTitle("统计管理");

        this.watch('page.current', () => {
            this.loadData(0);
        });

    }


    loadData(orderBy) {
        /*this.date = Moment(this.date).format("YYYY-MM-DD");*/
        HttpService.Statistics.getStatisticsItems(this.page.current, this.page.size,orderBy,'').then((response: any) => {
            this.statics = response.list;
            this.page.count = response.count;
            this.scopeApply();
        });
    }


}




