import { Injectable } from '@angular/core';
import { Resource } from './Resource';
import { ResourceConstants } from '../../constants/resource.constants';
import { OrganizationConstants } from '../../constants/organization.constants';
import { SessionConstants } from '../../constants/session.constants';

@Injectable()
export class SessionDataService {
  data: any;
  permissions: any;
  organization: any;
  role: any;
  operations: any;

  constructor() {}

  create(data: any) {
    if (data) {
      this.data = data;
      this.permissions = data.user.permissions;
      // this.organization = data.user.permissionModel.organization;
      this.role = data.user.role;
    }
  }

  clear() {
    if (localStorage) {
      this.data = null;
      this.permissions = null;
      this.organization = null;
      this.role = null;
      localStorage.removeItem(SessionConstants.SESSION);
      localStorage.removeItem(SessionConstants.TOKEN);
    }
  }

  operationAllowed(operation: any) {
    return this.operations.indexOf(operation) !== -1;
  }

  getResource(resource: any) {
    return this.permissions.resources[resource] ?
      new Resource(this.permissions.resources[resource]) : null;
  }

  // organization
  hasOrganization(organization: string) {
    return (this.organization === organization);
  }

  hasAnyOrganization(organizations: any[]) {
    for (let i = 0; i < organizations.length; i++) {
      if (this.hasOrganization(organizations[i])) {
        return true;
      }
    }
    return false;
  }

  hasRole(role: string) {
    return this.permissions.role.label === role;
  }

  hasAnyRole(roles: any[]) {
    for (var i = 0; i < roles.length; i++) {
      if (this.hasRole(roles[i])) {
        return true;
      }
    }
    return false;
  }

  getRoleRank() {
    return this.permissions.role.rank;
  }

  hasResource(resource: any) {
    return this.permissions.resources[resource] !== undefined;
  }

  hasAnyResource(resources: any[]) {
    for (let i = 0; i < resources.length; i++) {
      if (this.hasResource(resources[i])) {
        return true;
      }
    }
    return false;
  }

  getName() {
    return this.data.user.firstname + ' ' + this.data.user.lastname;
  }

  getRoleLabel() {
    return this.role.label;
  }

  getUserDetails() {
    return this.data.user.details;
  }

  isClearingAgent() {
    return this.hasOrganization(OrganizationConstants.CLEARINGAGENT);
  }

  isEconomicOperator() {
    return this.hasOrganization(OrganizationConstants.ECONOMICOPERATOR);
  }

  isMinistry() {
    return this.hasOrganization(OrganizationConstants.MINISTRY);
  }

  canGenerateAuthorizations() {
    return this.hasResource(ResourceConstants.BTN_GENERATE_AUTHORIZATION);
  }

  canViewESafe() {
    return this.getResource(ResourceConstants.ESAFE_VIEW_EDIT) &&
      this.getResource(ResourceConstants.ESAFE_VIEW_EDIT).operationAllowed('READ');
  }

  getId() {
    const session = JSON.parse(localStorage.getItem('session'));
    return session._id;
  }

  getToken() {
    return JSON.parse(localStorage.getItem('token'));
  }
}

