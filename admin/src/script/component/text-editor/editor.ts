import { HttpService } from './../../service/http';
import { Component, ComponentOption } from "../component";

@ComponentOption('textEditor', require('./editor.jade')(), {
    bindings: {
        ngModel: '='
    }
})
export class TextEditorComponent extends Component {

    ngModel: any;
    editor: any;

    onInit() {
        
       

    }

    imageUpload(files: any[]) {
        console.log();
        HttpService.File.upload(files[0]).then((response: any) => {
            this.editor.summernote("insertImage", response.url, 'filename');
            this.scope.$apply();
        });
    }


}