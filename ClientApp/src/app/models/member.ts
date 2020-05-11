import { Organization } from "./organization";

export class Member {
    public id: number;
    public organization: Organization;
    public fileId: number;
    public fileSrc: string;
    public file: any;

    constructor(
        public name: string,
        public organizationId: number,
        // public number: number,
        public location: string,
        public workplace: string,
        public yearOfBirth: string,
        public phoneNumber: string,
        public car: string) { }
}