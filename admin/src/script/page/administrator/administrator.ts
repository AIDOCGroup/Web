import { Moment } from './../../util';
import { HttpService } from './../../service/http';
import { Route, Page } from "../page";
import { AdminEditModal } from './modal/edit';

@Route('/administrator', 'administrator', require('./administrator.jade')())
export class AdministratorPage extends Page {

    items: any = [];

    pageInit(uibModal?: any) {

        this.setTitle("管理员管理");

        this.loadData();
        
    }

    loadData() {
        HttpService.Account.getAdminItems().then((response: any) => {
            this.items = response.list;
            this.scopeApply();
        }) 
    }

    update(admin?: any) {

        this.createModal(AdminEditModal, require('./modal/edit.jade')(), {
            admin: () => {
                return admin;
            }
        }, () => {
            this.loadData();
        })

    }

    remove(admin: any) {
        if(confirm('确定要删除？')) {
            HttpService.Account.deleteAdmin(admin.id).then(() => {
                this.loadData();
            });
        }
    }

}
