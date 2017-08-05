export class User {
    _id: string;
    createdAt: number|string;
    updatedAt: number|string;
    email: string;
    firstName: string;
    lastName: string;
    permissions: [string];
    role: string;
}

