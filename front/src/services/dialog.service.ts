import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class DialogService {
    constructor(
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
    ) {

    }


    public showSnackBar(text: string) {
        this.snackBar.open(text, null, { direction: 'ltr', duration: 4000, horizontalPosition: 'center', verticalPosition: 'bottom' });
    }

    public showDialog(data: string) {
        this.dialog.open(null, { data: data })
    }
}