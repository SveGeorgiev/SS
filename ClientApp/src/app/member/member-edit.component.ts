import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { Organization } from '../models/organization';
import { MemberService } from './member.service';
import { Member } from '../models/member';
import { OrganizationService } from '../organization/organization.service';
import Constants from '../constants';


@Component({
    selector: 'app-member-edit',
    templateUrl: './member-edit.component.html',
})
export class MemberEditComponent implements OnInit {
    memberForm: FormGroup;
    member: Member = {} as Member;
    organizations: Organization[];
    memberPhoto: File;

    constructor(
        private route: ActivatedRoute,
        private memberService: MemberService,
        private organizationService: OrganizationService,
        private location: Location) {
        this.memberService.getMember(+this.route.snapshot.params['id'])
            .subscribe((member: Member) => {
                this.member = member;

                this.memberForm.patchValue({
                    name: member.name !== null ? member.name : '',
                    // number: member.number !== null ? member.number : '',
                    location: member.location !== null ? member.location : '',
                    workplace: member.workplace !== null ? member.workplace : '',
                    yearOfBirth: member.yearOfBirth !== null ? member.yearOfBirth : '',
                    phoneNumber: member.phoneNumber !== null ? member.phoneNumber : '',
                    car: member.car !== null ? member.car : '',
                    organization: member.organizationId
                });

                if (this.member.fileId) {
                    this.member.fileSrc = `${Constants.apiUrl}/api/image/${member.fileId}`;
                }

                this.organizationService.getOrganizations()
                    .subscribe((organizations: Organization[]) => this.organizations = organizations, (error) => console.log(error));
            }, (error) => console.log(error));
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

    editMember() {
        const formData: FormData = new FormData();
        formData.append("id", this.member.id.toString());
        formData.append("name", this.memberForm.get("name").value);
        formData.append("organizationId", this.memberForm.get("organization").value);
        // formData.append("number", this.memberForm.get("number").value);
        formData.append("location", this.memberForm.get("location").value);
        formData.append("workplace", this.memberForm.get("workplace").value);
        formData.append("yearOfBirth", this.memberForm.get("yearOfBirth").value);
        formData.append("phoneNumber", this.memberForm.get("phoneNumber").value);
        formData.append("car", this.memberForm.get("car").value);

        if (this.memberPhoto) {
            formData.append("file", this.memberPhoto, this.memberPhoto.name);
        } else if (this.member.fileId) {
            formData.append("fileId", this.member.fileId.toString());
        }

        this.memberService.editMember(formData).subscribe(() => this.location.back(), (error) => console.log(error));
    }

    handleFileInput(files: FileList) {
        this.memberPhoto = files.item(0);
    }
}