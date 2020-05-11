import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MemberService } from './member.service';
import { Organization } from '../models/organization';
import { Member } from '../models/member';
import Constants from '../constants';

@Component({
    selector: 'app-member-details',
    templateUrl: './member-details.component.html',
})
export class MemberDetailsComponent {
    member: Member = {} as Member;
    organization: Organization = {} as Organization;

    constructor(
        private memberService: MemberService,
        private route: ActivatedRoute) {
        this.memberService.getMember(+this.route.snapshot.params['id'])
            .subscribe((member: Member) => {
                this.member = member;
                this.organization = member.organization;

                if (this.member.fileId) {
                    this.member.fileSrc = `${Constants.apiUrl}/api/image/${member.fileId}`;
                }
            }, (error) => console.log(error));
    }
}