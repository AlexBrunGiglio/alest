import { Directive, OnDestroy } from "@angular/core";
import { RoutesList } from "../routes/routes";
import { RolesList } from "../../../../shared/shared-constant"
import { environment } from "../../environments/environment";
import { MatSnackBar } from "@angular/material/snack-bar";

@Directive({})
export abstract class BaseComponent implements OnDestroy {
    public RoutesList = RoutesList;
    public RolesList = RolesList;
    public hasPendingModifications = false;
    public environment = environment;
    public loading = false;
    constructor() {
    }

    ngOnDestroy() { }
}