import "ng-file-upload"
import { Page } from "./page/page";

declare var angular: any;

export class App {

    private static app: any;
    private static appName: string = 'AngularAdmin';
    private static modules = ['ui.router', 'ui.bootstrap', 'ngFileUpload', 'summernote'];
    private static pages: Page[] = [];
    private static root: any;
    private static components: any[] = [];

    static initModules(rootPage: any, pages: any, components: Array<any>) {
        this.pages = pages;
        this.root = rootPage;
        this.components = components;
    }

    static bootstrap() {
        this.app = angular.module(this.appName, this.modules);

        // set root page
        this.app.controller(this.root["name"], this.root);
        this.app.config(['$locationProvider', '$stateProvider', (locationProvider: any, stateProvider: any) => {
            locationProvider.html5Mode(true);
            stateProvider.state('root', {
                template: this.root["template"],
                controller: this.root["name"],
                controllerAs: 'mv',
                abstract: true
            });
        }]);

        // set pages
        this.pages.forEach((page: any, index: number) => {
            this.app.controller(page["name"], page);
            this.app.config(['$stateProvider', (stateProvider: any) => {
                stateProvider.state(page.alias, {
                    url: page.path,
                    template: page.template,
                    controller: page,
                    controllerAs: 'mv',
                    parent: page.parent ? 'root' : ''
                });
            }]);
        });

        this.components.forEach((component: any) => {
            this.app.component(component.tag, Object.assign(component.options, {
                template: component.template,
                controller: component,
                controllerAs: 'mv',
                require: component.require
            }));
        });
        // start app
        angular.element().ready(() => {
            angular.bootstrap(document.body, [this.appName]);
        });
    }

}