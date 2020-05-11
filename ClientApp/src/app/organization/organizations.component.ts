import { Component } from '@angular/core';

import { Organization } from '../models/organization';
import { OrganizationService } from './organization.service';

import Constants from '../constants';
import { City } from '../models/city';
import { CityService } from '../city/city.service';

@Component({
    selector: 'app-ogranizations',
    templateUrl: './organizations.component.html',
})
export class OrganizationsComponent {
    organizations: Organization[] = [];
    cities: City[];
    selectedValue = 0;
    showAlertInfo = false;
    alertInfoText: string;

    constructor(private organizationService: OrganizationService, private cityService: CityService) {
        this.cityService.getCities().subscribe((cities: City[]) => this.cities = cities, (error) => console.log(error));
        this.getOgranizations();
    }

    getOgranizations() {
        this.organizationService.getOrganizations().subscribe((organizations: Organization[]) => {
            this.mapOrganizations(organizations);
        }, (error) => console.log(error));
    }

    getOgranizationsByCity(cityId: number) {
        this.organizationService.getOrganizationsByCity(cityId).subscribe((organizations: Organization[]) => {
            this.mapOrganizations(organizations);
        }, (error) => console.log(error));
    }

    deleteOrganization(organization: Organization) {
        this.organizationService.deleteOrganization(organization.id)
            .subscribe((organization: Organization) => {
                if (organization.isDeleted) {
                    this.getOgranizations()
                } else {
                    this.alertInfoText = `'${organization.name}' не може да бъде изтрит, защото има членове!`;
                    this.showAlertInfo = true;
                    window.scroll({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                    });
                }
            }, (error) => console.log(error));
    }

    onCitySelected(value: string) {
        const cityId = +value;
        if (cityId === 0) {
            this.getOgranizations();
        } else {
            this.getOgranizationsByCity(cityId);
        }
    }

    mapOrganizations(organizations: Organization[]) {
        this.organizations = organizations;

        for (const organization of this.organizations) {
            if (organization.fileId) {
                organization.fileSrc = `${Constants.apiUrl}/api/image/${organization.fileId}`;
            }
        }
    }

    closeAlert() {
        this.showAlertInfo = false;
    }
}