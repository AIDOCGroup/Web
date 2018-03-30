import { Component, ComponentOption } from "../component";

@ComponentOption('selector', require('./selector.jade')(), {
    bindings: {
        ngModel: '=',
        ngOpts: '<',
        ngFormat: '@'
    }
})
export class SelectorComponent extends Component {

    show = false;
    ngOpts: any[];
    ngModel: any;
    ngFormat: string;
    selectedOption: any;

    onInit() {
        let button = this.element.find('button')[0];
        document.addEventListener("click", (event: any)=> {
            if (event.target == button || event.target.parentElement == button) {

            }
            else {
                this.show = false;
                this.scope.$apply();
            }
        });

        this.watch("ngModel", () => {
            this.selectedOption = this.ngModel == undefined ? "请选择" : this.ngOpts[this.ngModel];
        })
        this.watch("ngOpts", () => {
            this.selectedOption = this.ngModel == undefined ? "请选择" : this.ngOpts[this.ngModel];
        }, true)
    }

    openPanel() {
        this.show = true;
    }

    select(k: string) {

        this.ngFormat || (this.ngFormat == 'string');

        switch(this.ngFormat) {
            case 'number':
                this.ngModel = parseInt(k);
                break;
            default:
                this.ngModel = k;
                break;
        }

        this.show = false;

    }


}