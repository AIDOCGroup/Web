import { Modal } from './../../modal';
import { HttpService } from "../../../service/http";



export class VersionEditModal extends Modal {

    private title: string;
    private version: any;

    static inject = ['version'];

    onInit(version?: any) {

        this.title = version ? '修改版本' : '添加版本';
        this.version = Object.assign({ isMust: false }, version ||  {});

        version && HttpService.Version.getVersion(version.id).then((response) => {
            this.version = response;
            this.version.isMust = Boolean(this.version.isMust);
            this.scopeApply();
        })
    }

    submit() {

        if (!this.version.os) {
            alert('系统不能为空');
            return;
        }
        if (!this.version.version) {
            alert('版本不能为空');
            return;
        }
        if (!this.version.downUrl) {
            alert('下载地址不能为空');
            return;
        }
        if (!this.version.size) {
            alert('包大小不能为空');
            return;
        }

        console.log(this.version);

        this.version.isMust = Number(this.version.isMust);

        if (this.version.id) {
            HttpService.Version.updateVersion(this.version).then((response) => {
                this.close(this.version);
                this.scopeApply();
            });
        }
        else {
            HttpService.Version.createVersion(this.version).then((response) => {
                this.close(response);
                this.scopeApply();
            });
        }
        

    }

}
