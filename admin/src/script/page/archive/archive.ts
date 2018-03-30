import { Moment } from './../../util';
import { HttpService } from './../../service/http';
import { Route, Page } from "../page";
import { ArchiveEditModal } from "./modal/edit";

@Route('/archive/:categoryId', 'archive-list', require('./archive.jade')())
export class ArchivePage extends Page {

    items: any = [];

    pageInit(uibModal?: any) {

        this.setTitle("文章管理");

        this.loadData();

    }

    loadData() {
        HttpService.Archive.getArchiveItems(this.stateParams.categoryId).then((response: any) => {
            this.items = response.list;
            this.items.forEach((item: any) => {
                item.lang = ['中文', '英文'][item.lang]
            });
            this.scopeApply();
        }) 
    }

    remove(archive: any) {
        if (confirm('确定删除')) {
            HttpService.Archive.deleteArchive(archive.id).then((response: any) => {
                this.loadData();
            }) 
        }
    }

    update(archive?: any) {

        this.createModal(ArchiveEditModal, require('./modal/edit.jade')(), {
            archive: () => {
                return archive;
            },
            categoryId: () => {
                return this.stateParams.categoryId
            }
        }, () => {
            this.loadData();
        }, 'lg')

    }

}