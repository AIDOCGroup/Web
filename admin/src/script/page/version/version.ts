import { Moment } from './../../util';
import { HttpService } from './../../service/http';
import { Route, Page } from "../page";
import { VersionEditModal } from './modal/edit';

@Route('/version', 'version', require('./version.jade')())
export class VersionPage extends Page {

    items: any = [];

    pageInit(uibModal?: any) {

        this.setTitle("版本管理");

        this.loadData();
        
    }

    loadData() {
        HttpService.Version.getVersionItems().then((response: any) => {
            this.items = response.list;
            this.scopeApply();
        }) 
    }

    update(version?: any) {

        this.createModal(VersionEditModal, require('./modal/edit.jade')(), {
            version: () => {
                return version;
            }
        }, () => {
            this.loadData();
        })

    }

    remove(version: any) {
        if(confirm('确定要删除？')) {
            HttpService.Version.deleteVersion(version.id).then(() => {
                this.loadData();
            });
        }
    }

}
