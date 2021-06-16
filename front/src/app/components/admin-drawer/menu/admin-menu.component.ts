import { Component, ViewEncapsulation } from "@angular/core";
import { BaseComponent } from "../../../base/base.component";

@Component({
    selector: 'app-sidebar',
    templateUrl: './admin-menu.component.html',
    styleUrls: ['./admin-menu.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class AdminSidebarComponent extends BaseComponent {
    constructor() {
        super();
    }
}