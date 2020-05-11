import { Component, Input, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'app-alert-info-component',
    templateUrl: './alert-info.component.html'
})
export class AlertInfoComponent {
    @Input() alertInfoText: string;
    @Output() close: EventEmitter<any> = new EventEmitter();

    closeAlert() {
        this.close.emit();
    }
}