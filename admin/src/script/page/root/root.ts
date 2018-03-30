
export class RootPage{

    static key = 'root';
    static template = require('./root.jade')();
    static $inject = ["$scope", "$location"];

    scope: any;
    location: any;
    menus = [
        {
            icon: 'glyphicon glyphicon-stats icon text-primary-dker',
            name: "Dashboard",
            href: "dashboard",
        },
        {
            icon: 'glyphicon glyphicon-tower icon text-info-dker',
            name: "管理员",
            href: "administrator",
        },
        {
            icon: 'glyphicon glyphicon-user icon text-info-dker',
            name: "用户管理",
            href: "user",
        },
        {
            icon: 'glyphicon glyphicon-bullhorn icon text-info-lter',
            name: "新闻管理",
            href: "archive/1",
        },
        {
            icon: 'glyphicon glyphicon-leaf icon text-info-lter',
            name: "关于我们",
            href: "archive/2",
        },
        {
            icon: 'f fa fa-pinterest icon text-info-lter',
            name: "运营管理",
            href: "promotion",
        },
        {
            icon: 'f fa fa-rocket icon text-info-lter',
            name: "邀请管理",
            href: "invitation",
        },
        {
            icon: 'f fa fa-arrows icon text-info-lter',
            name: "统计管理",
            href: "statistics",
        },
        {
            icon: 'f fa fa-eye icon text-info-lter',
            name: "康夫子",
            href: "kfz",
        },
        {
            icon: 'f fa fa-cube icon text-info-lter',
            name: "妙健康",
            href: "healthy",
        },
        {
            icon: 'glyphicon glyphicon-phone icon text-info-lter',
            name: "APP版本",
            href: "version",
        }

    ]

    constructor(scope: any, location: any) {

        this.scope = scope;
        this.location = location;
        this.scope.$on('$locationChangeSuccess', (event: any) => {
            this.positionMenu(this.location.$$url);
        })

        this.positionMenu(this.location.$$url);

    }

    positionMenu(path: string) {

        this.menus.forEach((menu: any) => {
            menu.open = false;
            if(menu.href && '/'+menu.href == path) {
                menu.open = true;
            }
            else if(menu.children){
                menu.children.forEach((subMenu: any) => {
                    if('/'+subMenu.href == path) {
                        menu.open = true;
                        subMenu.open = true;
                    }
                })
            }
        })

    }

    openMenu(menu: any) {
        if(menu.children) {
            this.menus.forEach((menu: any) => {
                menu.open = false;
            })
            menu.open = !menu.open;   
        }
        else {
            this.location.url(menu.href);
        }
    }

}
