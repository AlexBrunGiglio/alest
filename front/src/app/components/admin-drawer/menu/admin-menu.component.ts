import { Component, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { AuthDataService } from "../../../../services/auth-data.service";
import { DialogService } from "../../../../services/dialog.service";
import { BaseComponent } from "../../../base/base.component";

@Component({
    selector: 'app-sidebar',
    templateUrl: './admin-menu.component.html',
    styleUrls: ['./admin-menu.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class AdminSidebarComponent extends BaseComponent {
    constructor(
        private router: Router,
        public dialogService: DialogService,
    ) {
        super();
    }

    redirectToProfile() {
        this.router.navigateByUrl('/' + this.RoutesList.AdminUsers + '/' + AuthDataService.currentUser.id);
    }

    async logout() {
        const dialog = await this.dialogService.showDialog({ header: "Deconnexion", text: "Souhaitez vous vraiment vous déconnecter ?", okLabel: "Confirmer", cancelLabel: "Annuler" });
        console.log("🚀 ~ AdminSidebarComponent ~ logout ~ dialog", dialog);
    }
}