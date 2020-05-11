import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import Constants from '../constants';
import { Organization } from '../models/organization';


@Injectable()
export class OrganizationService {
    private organizationsUrl = `${Constants.apiUrl}/api/organizations`;

    constructor(private httpClient: HttpClient) {
    }

    getOrganization(organizationId: number) {
        return this.httpClient.get(`${this.organizationsUrl}/${organizationId}`);
    }

    getOrganizations() {
        return this.httpClient.get(this.organizationsUrl);
    }

    getOrganizationsByCity(cityId: number) {
        return this.httpClient.get(`${this.organizationsUrl}/GetOrganizationsByCity/${cityId}`);
    }

    saveOrganization(data: FormData) {
        return this.httpClient.post(this.organizationsUrl, data);
    }

    editOrganization(data: FormData) {
        return this.httpClient.put(this.organizationsUrl, data);
    }

    deleteOrganization(organizationId: number) {
        return this.httpClient.delete(`${this.organizationsUrl}/${organizationId}`);
    }
}