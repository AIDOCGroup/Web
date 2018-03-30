import { CourseDetail } from './../../../model/Kfz';
import { HttpService } from './../../../service/http';
import { Modal } from "../../modal";

export class kfzCreateModal extends Modal {
    private id: number;
    private data: CourseDetail;
    static inject = ['kfzId'];

    onInit(kfzId: any) {
        HttpService.Slide.courseDetail(kfzId).then((res: any)=>{
            this.data = res;
            this.scopeApply();
        });
    }

}