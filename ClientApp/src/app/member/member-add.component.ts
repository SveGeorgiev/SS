import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { OrganizationService } from '../organization/organization.service';
import { MemberService } from './member.service';

import { Organization } from '../models/organization';

@Component({
    selector: 'app-member-add',
    templateUrl: './member-add.component.html',
})
export class MemberAddComponent implements OnInit {
    memberForm: FormGroup;
    organizations: Organization;
    memberPhoto: File;

    constructor(
        private router: Router,
        private memberService: MemberService,
        private organizationService: OrganizationService) {
        this.organizationService.getOrganizations()
            .subscribe((organizations: Organization) => this.organizations = organizations, (error) => console.log(error));
    }

    ngOnInit(): void {
        this.memberForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            // number: new FormControl(''),
            location: new FormControl(''),
            workplace: new FormControl(''),
            yearOfBirth: new FormControl(''),
            phoneNumber: new FormControl(''),
            car: new FormControl(''),
            organization: new FormControl('', [Validators.required])
        });
    }

    saveMember() {
        const formData: FormData = new FormData();
        formData.append("name", this.memberForm.get("name").value);
        formData.append("organizationId", this.memberForm.get("organization").value.id);
        // formData.append("number", this.memberForm.get("number").value);
        formData.append("location", this.memberForm.get("location").value);
        formData.append("workplace", this.memberForm.get("workplace").value);
        formData.append("yearOfBirth", this.memberForm.get("yearOfBirth").value);
        formData.append("phoneNumber", this.memberForm.get("phoneNumber").value);
        formData.append("car", this.memberForm.get("car").value);

        if (this.memberPhoto) {
            formData.append("file", this.memberPhoto, this.memberPhoto.name);
        }

        this.memberService.saveMember(formData).subscribe(() => this.router.navigate(['/members']), (error) => console.log(error));
    }

    handleFileInput(files: FileList) {
        this.memberPhoto = files.item(0);
    }
}