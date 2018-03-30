import { CourseDetail } from './../../model/Slide';
import { Helper, Moment } from './../../util';
import { HttpService } from './../../service/http';
import { Page, Route } from "../page";
import { slideCreateModal } from './modal/detail';

@Route('/slide', 'slide', require('./slide.jade')())

export class SlidePage extends Page {

    private uibModal: any;

    static inject = ["$uibModal"];

    slide: any[];
    datepicker = {
        opened: false,
        options: {
            maxDate: new Date(),
        }
    }
    date: any = new Date();
    formatDate: any;

    page: {
        current: number,
        items: any[],
        size: number
    } = {
            current: 0,
            items: [],
            size: 20
        }

    sort: {
        created: number,
        updated: number,
        isFirst: number,
        pages: number,
        updateCount: number,
    } = {
            created: 0,
            updated: 0,
            isFirst: 0,
            pages: 0,
            updateCount: 0
        }

    $onInit() {

    }

    pageInit(uibModal?: any) {
        this.uibModal = uibModal;
        super.pageInit();

        this.setTitle("今日课件");

        this.watch('date', () => {
            this.formatDate = Moment(this.date).format("YYYY-MM-DD");
            HttpService.Slide.list(this.formatDate).then((response: any) => {
                this.page.items = response;
                this.page.current = 1;
                this.resetSort('');
                this.paging();
                this.scopeApply();
            });
        })

        this.watch('page.current', () => {
            this.paging();
        });

    }

    resetSort(exclude: string) {
        for (let key in this.sort) {
            if (key != exclude) {
                (this.sort as any)[key] = 0;
            }
        }
    }

    paging() {
        this.slide = this.page.items.slice((this.page.current - 1) * this.page.size, this.page.current * this.page.size);
    }

    sortChange(key: string) {
        this.resetSort(key);
        this.sorting();
    }

    sorting() {

        this.page.items = Helper.sortBy(this.page.items, (item: any) => {

            if (this.sort.created == 1) {
                return Moment(item.createdAt).valueOf();
            }
            else if (this.sort.created == -1) {
                return -Moment(item.createdAt).valueOf();
            }
            else if (this.sort.updated == 1) {
                return Moment(item.updatedAt).valueOf();
            }
            else if (this.sort.updated == -1) {
                return -Moment(item.updatedAt).valueOf();
            }
            else if (this.sort.pages == 1) {
                return item.filmstripCount;
            }
            else if (this.sort.pages == -1) {
                return -item.filmstripCount;
            }
            else if (this.sort.isFirst == 1) {
                return Number(item.isFirst);
            }
            else if (this.sort.isFirst == -1) {
                return -Number(item.isFirst);
            }
            else if (this.sort.updateCount == 1) {
                return item.updateCount;
            }
            else if (this.sort.updateCount == -1) {
                return -item.updateCount;
            }
            else {
                return item.id;
            }
        })

        this.paging();

    }

    openModal(slideId: number) {
        this.uibModal.open({
            animation: true,
            template: require('./modal/detail.jade')(),
            controller: slideCreateModal,
            controllerAs: "md",
            size:'lg',
            resolve: {
                slideId: function () {
                    return slideId;
                }
            }
        });
    }

}
