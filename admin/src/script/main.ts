import { SelectorComponent } from './component/selector/selector';
import { VersionPage } from './page/version/version';
import { ImageUploadComponent } from './component/upload/image/image';
import { TextEditorComponent } from './component/text-editor/editor';
import { ArchivePage } from './page/archive/archive';
import { AccountLoginPage } from './page/account/login/page';
import { AdministratorPage } from './page/administrator/administrator';
import { AnalysisRetainComponent } from './component/analysis/retain/retain';
import { SlidePage } from './page/slide/slide';
import { Page } from './page/page';
import { App } from './app';
import { RootPage } from './page/root/root';
import { DashbaordPage } from './page/dashboard/dashboard';
import { PromotionPage } from './page/promotion/promotion';
import { StatisticsPage } from './page/statistics/statistics';
import { KfzPage } from './page/kfz/kfz';
import { HealthyPage } from './page/healthy/healthy';
import { InvitationPage } from './page/invitation/invitation';
import { Moment } from './util';
import { PaginationComponent } from './component/table/pagination/pagination';
import { SortComponent } from './component/table/sort/sort';
import { UserPage } from './page/user/user';

Moment.locale('zh-cn');

App.initModules(RootPage, [
    DashbaordPage,
    AdministratorPage,
    AccountLoginPage,
    ArchivePage,
    UserPage,
    VersionPage,
    PromotionPage,
    StatisticsPage,
    KfzPage,
    HealthyPage,
    InvitationPage,
], [
    PaginationComponent,
    SortComponent,
    AnalysisRetainComponent,
    TextEditorComponent,
    ImageUploadComponent,
    SelectorComponent
]);

App.bootstrap();



