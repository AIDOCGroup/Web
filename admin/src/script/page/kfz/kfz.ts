import { Route, Page } from "../page";
import { HttpService } from './../../service/http';
import { Moment } from './../../util';
import { ArchiveEditModal } from "./modal/edit";

@Route('/kfz', 'kfz', require('./kfz.jade')())
export class KfzPage extends Page {

    kang:any = [];

    detail:any=[];

    page:{
        size: number,
        count: number,
        current: number,
    } = {
        size: 10,
        count: 0,
        current: 1
    }


    pageInit(uibModal?:any) {

        this.setTitle("康夫子");

        this.watch('page.current', () => {
            this.loadData();
        });

    }


    loadData() {
        HttpService.Kfz.getKfzItems(this.page.current, this.page.size,'').then((response:any) => {
            this.kang = response.list;
            this.page.count = response.count;
            console.log(this.page);
            this.scopeApply();
        });
    }
    loadStart(Id) {
        HttpService.Kfz.getKfzDetail(Id).then((response:any) => {
            this.detail = response.list;
            this.scopeApply();
        });
    }


    question(Id){
        this.loadStart(Id);
        document.getElementById("show").style.display="block";


    }
    dismiss(){
        document.getElementById("show").style.display="none";
    }

}

