import { Modal } from "./modal";


export function Route(path: string, alias: string, template: string, parent: boolean = true) {
    return function(target: any) {
         target.template = template;
         target.path = path;
         target.alias = alias;
         target.parent = parent;
         return target;
    }
}

export class Page {

    static template: string = null;
    static routeUrl: string = null;
    static parent: boolean = false;
    static controllerName: string = "Page";

    protected scope: any;
    protected location: any;
    protected rootScope: any;
    protected uibModal: any;
    protected stateParams: any;

    static inject: string[] = [];
    static get $inject() {
        return ["$scope", "$rootScope", "$location", "$stateParams", "$uibModal"].concat(this.inject)
    }

    constructor(...args: any[]) {

        this.scope = args[0];
        this.rootScope = args[1];
        this.location = args[2];
        this.stateParams = args[3];
        this.uibModal = args[4];

        args.splice(0, 5);

        setTimeout(() => {
            this.pageInit(...args);
            this.scopeApply();
        });

        let _class:any = this.constructor;

        _class.template || console.log(_class.template, '未配置 template');
        _class.path || console.log(_class.path, '未配置 path');

    }

    pageInit() {}

    setTitle(title: string) {
        this.rootScope.title = title;
    }

    setMenuIndex(index: number) {
        this.rootScope.menuIndex = index;
    }

    scopeApply() {
        if(!this.scope.$$phase) this.scope.$apply();
    }
    locationUrl(url: string) {
        this.location.url(url);
        this.scopeApply();
    }

    watch(attrName: string, callback: (newValue?: any, oldValue?: any) => void, deep: boolean = false) {
        this.scope.$watch('mv.'+attrName, callback, deep);
    }

    createModal(controller: any, template: string, resolve: any = {}, closeCallback?: (result: any) => void, size: string = 'md') {

        let modal =  this.uibModal.open({
            animation: true,
            template: template,
            controller: controller,
            controllerAs: "mv",
            resolve: resolve,
            size: size
        });

        modal.result.then(closeCallback);

        return modal;

    }

}