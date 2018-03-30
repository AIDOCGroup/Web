import { Modal } from './../../modal';
import { HttpService } from "../../../service/http";



export class AdminEditModal extends Modal {

    private title: string;
    private admin: any;

    static inject = ['admin'];

    onInit(admin?: any) {

        this.title = admin ? '修改管理员' : '添加管理员';
        this.admin = Object.assign({ sort: 0 }, admin ||  {});

        admin && HttpService.Account.getAdmin(admin.id).then((response) => {
            this.admin = response;
            this.scopeApply();
        })
    }

    submit() {

        if (!this.admin.phoneNumber) {
            alert('手机号不能为空');
            return;
        }
        if (!this.admin.realName) {
            alert('真实不能为空');
            return;
        }
        if (!this.admin.password) {
            alert('密码不能为空');
            return;
        }

        if (this.admin.id) {
            HttpService.Account.updateAdmin(this.admin).then((response) => {
                this.close(this.admin);
                this.scopeApply();
            });
        }
        else {
            HttpService.Account.createAdmin(this.admin).then((response) => {
                this.close(response);
                this.scopeApply();
            });
        }
        

    }

}
