import {plainToInstance} from "class-transformer";
import {validate} from "class-validator";

export default async function validateAndParseBody<T extends Object>(request: Request, DTOClass: new () => T) {
    const body = await request.json();
    const obj = plainToInstance(DTOClass, body);
    const res = await validate(obj);
    return {valid: res.length === 0, body: obj, errors: res};
}
