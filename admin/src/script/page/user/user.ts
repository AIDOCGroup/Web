import { Moment } from './../../util';
import { HttpService } from './../../service/http';
import { Route, Page } from "../page";
import { ArchiveEditModal } from "./modal/edit";

@Route('/user', 'user-list', require('./user.jade')())
export class UserPage extends Page {

    items: any = [];

    page: {
        size: number,
        count: number,
        current: number,

    } = {
        size: 10,
        count: 0,
        current: 1,
    };
    dataBtn(start,end){
     var starts = $("#"+start).val(),ends = $("#"+end).val();
        this.loadData(starts,ends);
    }

    pageInit(uibModal?: any) {

        this.setTitle("用户管理");

        this.watch('page.current', () => {
            this.loadData($("#start").val(),$("#end").val());
        });


    }

    loadData(starts,ends) {

        HttpService.User.getUserItems(this.page.current,this.page.size,starts,ends).then((response: any) => {
            this.items = response.list;
            this.page.count = response.count;
            this.items.forEach((item: any) => {
                item.sex = ['男', '女'][item.sex];
            });
            console.log(this.page);
            this.scopeApply();
        });
    }

}