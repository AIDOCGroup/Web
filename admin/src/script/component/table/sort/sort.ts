import { Component, ComponentOption } from './../../component';

@ComponentOption('sort', require('./sort.jade')(), {
    bindings: {
        onChange: '&',
        sortKey: '='
    },
    transclude: true
})
export class SortComponent extends Component {

    private sortKey = 0;

    onChange: () => void;

    onInit() {

    }

    sort() {

        if(this.sortKey == 0) {
            this.sortKey = 1;
        }
        else if(this.sortKey == 1) {
            this.sortKey = -1;
        }
        else {
            this.sortKey = 0;
        }

        setTimeout(() => {
            this.onChange && this.onChange();
        })

    }

}