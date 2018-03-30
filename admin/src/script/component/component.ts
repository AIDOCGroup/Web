
export function ComponentOption(tag: string, template: string, options: any) {
    return function(target: any) {
        target.tag = tag;
        target.template = template;
        target.options = options;
    }
}

export class Component {

    scope: any;
    element: any;

    static inject: string[] = [];
    static get $inject() {
        return ['$scope', '$element'].concat(this.inject)
    }

    constructor(...args: any[]) {

        this.scope = args[0];
        this.element = args[1];

        args.splice(0, 2);

        setTimeout(() => {
            this.onInit(...args);
            this.scopeApply();
        });

    }

    onInit(){}

    watch(attrName: string, callback: (newValue?: any, oldValue?: any) => void, deep: boolean = false) {
        this.scope.$watch('mv.'+attrName, callback, deep);
    }

    scopeApply() {
        if(!this.scope.$$phase) this.scope.$apply();
    }

}