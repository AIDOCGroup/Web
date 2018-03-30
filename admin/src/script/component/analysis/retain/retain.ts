import { Component, ComponentOption } from './../../component';

@ComponentOption('analysisRetain', require('./retain.jade')(), {
    bindings: {
        datasource: '<'
    }
})
export class AnalysisRetainComponent extends Component {

    private datasource: any;

}