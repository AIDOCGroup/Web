import { Moment } from './../../../util';
import { HttpService } from './../../../service/http';
import { Page, Route } from './../../page';

@Route('/slide/with/user', 'slide-with-user', require('./with-user.jade')())
export class SlideWithUserPage extends Page {

    page: {
        current: number,
        items: any[],
        size: number,
        itemCount: number
    } = {
        current: 0,
        items: [],
        size: 20,
        itemCount: 0
    }
    
    sort: any = {
        createdAt: {
            sortKey: 0,
            sortWith: 'created_at'
        
        },
        lastLogin: {
            sortKey: 0,
            sortWith: 'last_login'
        }
    }

    currentSort = {
        sortKey: 0,
        sortWith: 'id'
    }

    pageInit() {

        this.setTitle("用户列表");

        this.page.current = 1;

        this.watch('page.current', () => {
            this.loadData();
        });

    }

    sortChange(sortName: string) {

        for(let key in this.sort) {
            if(key != sortName) {
                this.sort[key].sortKey = 0;
            }
        }

        this.currentSort = this.sort[sortName];

        this.loadData();

    }

    loadData() {

        HttpService.Slide.withUser(
            this.currentSort.sortWith, this.currentSort.sortKey, 
            this.page.current, this.page.size
        ).then((response: any) => {
            this.page.items = response.items;
            this.page.items.forEach((item: any) => {
                item.createdAt = Moment.unix(item.createdAt).format('Y-MM-DD');
                item.lastLogin = Moment.unix(item.lastLogin).fromNow();
            })
            this.page.itemCount = response.count;
            this.scopeApply();
        });
    }

}
