import { Case } from "app/models/case";

export class VolunteeringCase {
    id:string;
    location:string;
    duration:string;
    time:Date;
    CaseId:number;
    Case:Case;
}