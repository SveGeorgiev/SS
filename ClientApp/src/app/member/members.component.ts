import { Component, OnInit, Input } from '@angular/core';
import { MemberService } from './member.service';

import { Member } from '../models/member';
import Constants from '../constants';
import { Organization } from '../models/organization';
import { OrganizationService } from '../organization/organization.service';

@Component({
    selector: 'app-members',
    templateUrl: './members.component.html',
})
export class MembersComponent implements OnInit {
    members: Member[] = [];
    organizations: Organization[] = [];
    @Input() organizationId;
    @Input() showByOrganizationsFilter = true;
    selectedValue = 0;

    constructor(
        private memberService: MemberService,
        private organizationService: OrganizationService) {
        this.organizationService.getOrganizations().subscribe((organizations: Organization[]) => this.organizations = organizations, (error) => console.log(error));
    }

    ngOnInit(): void {
        if (this.organizationId) {
            this.getMembersByOrganization(this.organizationId);
        } else {
            this.getMembers();
        }
    }

    getMembers() {
        this.memberService.getMembers()
            .subscribe((members: Member[]) => {
                this.members = members;
                for (const member of this.members) {
                    if (member.fileId) {
                        member.fileSrc = `${Constants.apiUrl}/api/image/${member.fileId}`;
                    }
                }
            }, (error) => console.log(error));
    }

    getMembersByOrganization(organizationId: number) {
        this.memberService.getMembersByOrganization(organizationId)
            .subscribe((members: Member[]) => {
                this.members = members;
                for (const member of this.members) {
                    if (member.fileId) {
                        member.fileSrc = `${Constants.apiUrl}/api/image/${member.fileId}`;
                    }
                }
            }, (error) => console.log(error));
    }

    deleteMember(member: Member) {
        this.memberService.deleteMember(member.id).subscribe(() => this.getMembers(), (error) => console.log(error));
    }

    onOrganizationSelected(value: string) {
        const organizationId = +value;
        if (organizationId === 0) {
            this.getMembers();
        } else {
            this.getMembersByOrganization(organizationId);
        }
    }
}