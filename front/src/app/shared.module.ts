import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from "@angular/router";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatSelectModule,
        RouterModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
    ],
    declarations: [
    ],
    entryComponents: [
    ],
    exports: [
    ],
})

export class SharedModule { }