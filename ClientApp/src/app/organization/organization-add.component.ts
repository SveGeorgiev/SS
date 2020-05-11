import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { City } from '../models/city';
import { CityService } from '../city/city.service';
import { OrganizationService } from './organization.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-ogranization-add',
    templateUrl: './organization-add.component.html',
})
export class OrganizationAddComponent implements OnInit {
    organizationForm: FormGroup;
    organizationFlag: File;
    cities: City[];

    constructor(
        private cityService: CityService,
        private organizationService: OrganizationService,
        private router: Router) {
        this.cityService.getCities().subscribe((cities: City[]) => this.cities = cities, (error) => console.log(error));
    }

    ngOnInit(): void {
        this.organizationForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            description: new FormControl(''),
            city: new FormControl('', [Validators.required])
        });
    }

    saveOrganization() {
        const formData: FormData = new FormData();
        formData.append("name", this.organizationForm.get("name").value);
        formData.append("cityId", this.organizationForm.get("city").value.id);
        formData.append("description", this.organizationForm.get("description").value);
        if (this.organizationFlag) {
            formData.append("file", this.organizationFlag, this.organizationFlag.name);
        }

        this.organizationService.saveOrganization(formData)
            .subscribe(() => this.router.navigate(['/organizations']), (error) => console.log(error));
    }

    handleFileInput(files: FileList) {
        this.organizationFlag = files.item(0);
    }
}