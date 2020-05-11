import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Organization } from '../models/organization';
import { City } from '../models/city';
import { CityService } from '../city/city.service';
import { OrganizationService } from './organization.service';
import Constants from '../constants';


@Component({
    selector: 'app-ogranization-edit',
    templateUrl: './organization-edit.component.html',
})
export class OrganizationEditComponent {
    organizationForm: FormGroup;
    organization: Organization = {} as Organization;
    cities: City[];
    organizationFlag: File;

    constructor(
        private cityService: CityService,
        private organizationService: OrganizationService,
        private router: Router,
        private route: ActivatedRoute) {
        this.organizationForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            description: new FormControl(''),
            city: new FormControl('', [Validators.required]),
        });

        this.cityService.getCities().subscribe((cities: City[]) => this.cities = cities);
        this.getOrganization();
    }

    getOrganization() {
        this.organizationService
            .getOrganization(+this.route.snapshot.params['id'])
            .subscribe((organization: Organization) => {
                this.organization = organization;

                this.organizationForm.patchValue({
                    name: organization.name !== null ? organization.name : '',
                    description: organization.description !== null ? organization.description : '',
                    city: organization.cityId,
                });

                if (this.organization.fileId) {
                    this.organization.fileSrc = `${Constants.apiUrl}/api/image/${organization.fileId}`;
                }
            }, (error) => console.log(error));
    }

    editOrganization() {
        const formData: FormData = new FormData();
        formData.append("id", this.organization.id.toString());
        formData.append("name", this.organizationForm.get("name").value);
        formData.append("cityId", this.organizationForm.get("city").value);
        formData.append("description", this.organizationForm.get("description").value);

        if (this.organizationFlag) {
            formData.append("file", this.organizationFlag, this.organizationFlag.name);
        } else if (this.organization.fileId) {
            formData.append("fileId", this.organization.fileId.toString());
        }

        this.organizationService.editOrganization(formData)
            .subscribe(() => this.router.navigate(['/organizations']), (error) => console.log(error));
    }

    handleFileInput(files: FileList) {
        this.organizationFlag = files.item(0);
    }
}