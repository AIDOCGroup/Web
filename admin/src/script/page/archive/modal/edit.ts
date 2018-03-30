import { Modal } from './../../modal';
import { HttpService } from "../../../service/http";

export class ArchiveEditModal extends Modal {

    private title: string;
    private archive: any;
    private categoryId: number;
    private langOpts: any;

    static inject = ['archive', 'categoryId'];

    onInit(archive: any, categoryId: number) {

        this.langOpts = {
            0: "中文",
            1: "英文"
        }

        this.title = archive ? '修改文章' : '添加文章';
        this.archive = Object.assign({categoryId: categoryId}, archive ||  {});

        archive && HttpService.Archive.getArchive(archive.id).then((response) => {
            this.archive = response;
            this.scopeApply();
        })
    }

    submit() {

        if (!this.archive.title) {
            alert('标题不能为空');
            return;
        }

        this.archive.lang = Number(this.archive.lang);

        if (this.archive.id) {
            HttpService.Archive.updateArchive(this.archive).then((response) => {
                this.close(this.archive);
                this.scopeApply();
            });
        }
        else {
            HttpService.Archive.createArchive(this.archive).then((response) => {
                this.close(response);
                this.scopeApply();
            });
        }
        

    }

}
