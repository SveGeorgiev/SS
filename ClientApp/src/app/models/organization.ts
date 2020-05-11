import { Member } from "./member";
import { City } from "./city";

export class Organization {
    public id: number;
    public fileId: number;
    public fileSrc: string;
    public file: any;
    public src: any;
    public members: Member[];
    public city: City = {} as City;
    public isDeleted: boolean;

    constructor(
        public name: string,
        public cityId: number,
        public description: string) { }
}