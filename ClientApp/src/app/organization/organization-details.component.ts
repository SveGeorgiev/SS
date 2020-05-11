import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OrganizationService } from './organization.service';
import { Organization } from '../models/organization';
import { City } from '../models/city';
import Constants from '../constants';

@Component({
    selector: 'app-ogranization-details',
    templateUrl: './organization-details.component.html',
})
export class OrganizationDetailsComponent {
    organization: Organization = {} as Organization;
    city: City = {} as City;

    constructor(
        private organizationService: OrganizationService,
        private route: ActivatedRoute) {
        this.getOrganization();
    }

    getOrganization() {
        this.organizationService
            .getOrganization(+this.route.snapshot.params['id'])
            .subscribe((organization: Organization) => {
                this.organization = organization;
                this.city = organization.city;

                if (this.organization.fileId) {
                    this.organization.fileSrc = `${Constants.apiUrl}/api/image/${organization.fileId}`;
                }
            }, (error) => console.log(error));
    }
}