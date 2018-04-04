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
    orders(order,text){
        this.loadData(order,text);
    }

    dataBtn(order,start,end,text){
        var texts = $("#text").val();
        this.loadData(0,texts);
    }

    pageInit(uibModal?: any) {

        this.setTitle("统计管理");

        this.watch('page.current', () => {
            this.loadData(0,$("#text").val());
        });


    }
    loadText(text) {
        HttpService.Statistics.getTextItems(text,this.page.current, this.page.size).then((response: any) => {
            this.statics = response.list;
            this.scopeApply();
        });
    }

    loadData(orderBy,texts) {
        /*this.date = Moment(this.date).format("YYYY-MM-DD");*/
        HttpService.Statistics.getStatisticsItems(this.page.current,this.page.size,orderBy,texts,'').then((response: any) =>
            {
                this.statics = response.list;
                this.page.count = response.count;
                this.scopeApply();
            });
     }



}




