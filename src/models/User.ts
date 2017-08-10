export class User {
  /* _id: string;
  createdAt: number|string;
  updatedAt: number|string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  permissions: [string];
  role: string; */

  constructor(public _id?: string,
              public createdAt?: number|string,
              public updatedAt?: number|string,
              public email?: string,
              public password?: string,
              public firstName?: string,
              public lastName?: string,
              public permissions?: [string],
              public role?: string) {}
}

