import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-ngb-modal-content',
    templateUrl: './ngb-modal-content.component.html'
})
export class NgbModalContentComponent {
    @Input() name;

    constructor(public activeModal: NgbActiveModal) { }
}