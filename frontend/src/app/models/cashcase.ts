import { Case } from "app/models/case";

export class CashCase {
    id:string;
    amount_required:number;
    amount_recieved:number;
    CaseId:number;
    Case:Case;
}