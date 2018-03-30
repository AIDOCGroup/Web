
export class Modal {

    rootScope: any;
    scope: any;
    uibModalInstance: any;

    static inject: string[] = [];
    static get $inject() {
        return ["$scope", "$rootScope", "$uibModalInstance"].concat(this.inject)
    }

    constructor(...args: any[]) {

        this.scope = args[0];
        this.rootScope = args[1];
        this.uibModalInstance = args[2];

        args.splice(0, 3);

        setTimeout(() => {
            this.onInit(...args);
            this.scopeApply();
        });
        

    }

    onInit(...args: any[]) {

    }

    scopeApply() {
        this.scope.$apply();
    }

    close(result?: any) {
        this.uibModalInstance.close(result);
    }
    dismiss() {
        this.uibModalInstance.dismiss();
    }

}