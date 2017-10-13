import { Response } from '@angular/http';
import { constants } from "app/config/contants";


export class Helper {
    static extractData(res: Response): any {
        let body;
        try {
            body = res.json().data;
        }
        catch (err) {
            body = {};
        }
        return body || {};
    }

    static extractArray(res: Response): any {
        let body = res.json().data;
        return body || [];
    }
    static handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
    static validateCase(type: string, object: any): boolean {
        let keys;
        switch (type) {
            case 'blood':
                keys = constants.BLOOD_PARAMS;
                break;
            case 'cash':
                keys = constants.CASH_PARAMS;
                break;
            case 'volunteering':
                keys = constants.VOLUNTEERING_PARAMS;
                break;
        }
        return Helper.validate(keys, object);
    }

    static validate(keys, object): boolean {
        for (var i in keys) {
            if (!(i in object) || !object[i]) {
                return false;
            } else if (keys[i] === "number" && isNaN(object[i])) {
                return false;
            }
            else if (keys[i] == "date" || keys[i] == "time") {
                if (isNaN(Date.parse(object[i]))) {
                    return false;
                }

            }
        }
        return true;
    }

}