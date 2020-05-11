import { Component, Input, EventEmitter, Output } from "@angular/core";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgbModalContentComponent } from "./ngb-modal-content.component";

@Component({
    selector: 'app-ngb-modal-component',
    templateUrl: './ngb-modal.component.html'
})
export class NgbModalComponent {
    @Input() item;
    @Output() agree: EventEmitter<any> = new EventEmitter();

    constructor(private modalService: NgbModal) { }

    open() {
        const modalRef = this.modalService.open(NgbModalContentComponent);
        modalRef.componentInstance.name = this.item.name;
        modalRef.result.then((isAgree: boolean) => {
            if (isAgree) { this.agree.emit(); }
        });
    }
}