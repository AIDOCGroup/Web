import { Service } from "./service";
import { Constant } from "../constant";

export class FileService extends Service{

    upload (file: any) {
        
        var formData = new FormData();
        formData.append('file', file);

        return this.request.post('/lib/file/upload', formData, {
            processData: false, contentType: false
        });

    };

}