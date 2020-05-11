import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import Constants from '../constants';
import { Member } from '../models/member';

@Injectable()
export class MemberService {
    private membersUrl = `${Constants.apiUrl}/api/members`;

    constructor(private httpClient: HttpClient) {
    }

    getMember(id: number) {
        return this.httpClient.get(`${this.membersUrl}/${id}`);
    }

    getMembers() {
        return this.httpClient.get(this.membersUrl);
    }

    getMembersByOrganization(organizationId: number) {
        return this.httpClient.get(`${this.membersUrl}/GetMembers/${organizationId}`);
    }

    saveMember(data: FormData) {
        return this.httpClient.post(this.membersUrl, data);
    }

    editMember(data: FormData) {
        return this.httpClient.put(this.membersUrl, data);
    }

    deleteMember(memberId: number) {
        return this.httpClient.delete(`${this.membersUrl}/${memberId}`);
    }
}