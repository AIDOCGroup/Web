import { CourseDetail } from './../../../model/Slide';
import { HttpService } from './../../../service/http';
import { Modal } from "../../modal";

export class slideCreateModal extends Modal {
    private id: number;
    private data: CourseDetail;
    static inject = ['slideId'];

    onInit(slideId: any) {
        HttpService.Slide.courseDetail(slideId).then((res: any)=>{
            this.data = res;
            this.scopeApply();
        });
    }
    
}