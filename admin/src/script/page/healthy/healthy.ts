import { Moment } from './../../util';
import { HttpService } from './../../service/http';
import { Route, Page } from "../page";
import { ArchiveEditModal } from "./modal/edit";

@Route('/healthy', 'healthy', require('./healthy.jade')())
export class HealthyPage extends Page {

    head: any = [];

    page: {
        size: number,
        count: number,
        current: number,

    } = {
        size: 10,
        count: 0,
        current: 1,
    };
    orders(sum){
        this.loadData(sum);
    }
    pageInit(uibModal?: any) {

        this.setTitle("");
        this.watch('page.current', () => {
            this.loadData(0);
        });

    }

    loadData(sumS) {

        HttpService.Healthy.getHealthyItems(this.page.current,this.page.size,sumS,'').then((response: any) => {
            this.head = response.list;
            this.page.count = response.count;

            console.log(this.page);
            this.scopeApply();
            });
        }
    }
