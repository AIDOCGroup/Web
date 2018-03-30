import { Route, Page } from "../page";
import { HttpService } from './../../service/http';

@Route('/promotion', 'promotion', require('./promotion.jade')())
export class PromotionPage extends Page {

    id:any = [];


    page:{
        size: number,
        count: number,
        current: number,
    } = {
        size: 5,
        count: 0,
        current: 1
    }

    pageInit(uibModal?:any) {


        this.setTitle("运营管理");

        this.watch('page.current', () => {
            this.loadData();
        });

    }

    loadData() {

        HttpService.Promotion.getPromotionItems(this.page.current, this.page.size, '').then((response:any) => {
            this.id = response.list;
            this.page.count = response.count;
            console.log(this.page);
            this.scopeApply();
        });
    }

}

