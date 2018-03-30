import { Component, ComponentOption } from "../../component";
import { HttpService } from "../../../service/http";


@ComponentOption('imageUpload', require('./image.jade')(), {
    bindings: {
        ngModel: '=',
        ngSize: '@'
    }
})
export class ImageUploadComponent extends Component {

    ngModel: any;
    ngSize: string;
    size: string;
    url: string;

    onInit() {

        this.watch("ngModel", () => {
            this.url = this.ngModel;
        });

        this.size = `thumb-${this.ngSize || 'sm'}`;

    }

    upload(file: any) {
        if (file) {
            HttpService.File.upload(file).then((response: any) => {
                this.ngModel = response.url;
                this.scopeApply();
            });
        }
        
    }

}