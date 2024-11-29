import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormComponent } from '../form/form.component';

@Component({
    selector: 'app-visual',
    standalone: true,
    imports: [
        CommonModule, FormComponent
    ],
    templateUrl: './visual.component.html',
    styleUrl: './visual.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisualComponent { }
