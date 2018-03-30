import { Component, ComponentOption } from './../../component';

@ComponentOption('pagination', require('./pagination.jade')(), {
    bindings: {
        pageSize: '<',
        itemCount: '<',
        ngModel: '='
    }
})
export class PaginationComponent extends Component {

    pageSize: any;
    itemCount: number;
    // current page
    ngModel: number;

    pages: number[] = [];
    pageCount: number = 0;

    onInit() {

        this.watch('ngModel', (page: number) => {
            if(page > 0) {
                this.refreshPages();
            }
        })
        this.watch('itemCount', (count: number) => {
            if(count > 0) {
                this.refreshPages();
            }
        })

    }

    paging(page: number) {
    
        this.ngModel = page;

    }

    next() {
        this.ngModel < this.pageCount && this.ngModel ++;
    }

    prev() {
        this.ngModel > 1 && this.ngModel --;
    }

    refreshPages() {

        this.pageCount = Math.ceil(this.itemCount/this.pageSize);
        this.pages = [1];
   
        var min = (this.ngModel-2) > 1 ? this.ngModel-2 : 2,
            max = Math.min(this.pageCount-1, this.ngModel+2);
            
        for(var i=min; i<=max; i++) {
            this.pages.push(i)
        }

        this.pageCount>1 && this.pages.push(this.pageCount);


    }

}