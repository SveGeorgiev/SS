import { Component, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { NotifyService } from '../services/notify.service.component';
import { Organization } from '../models/organization';
import { OrganizationService } from '../organization/organization.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements AfterViewChecked {
  isExpanded = false;
  showSpinner = false;
  organizations: Organization[];

  constructor(
    private cdRef: ChangeDetectorRef,
    private notifyService: NotifyService,
    private organizationService: OrganizationService) {
    this.organizationService.getOrganizations()
      .subscribe((organizations: Organization[]) => this.organizations = organizations, (error) => console.log(error));
  }

  ngAfterViewChecked(): void {
    const show = this.notifyService.visibility.getValue();
    if (show !== this.showSpinner) {
      this.showSpinner = show;
      this.cdRef.detectChanges();
    }
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
