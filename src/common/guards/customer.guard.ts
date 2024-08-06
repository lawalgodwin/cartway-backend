import { Injectable } from "@nestjs/common";
import { AuthorizationGuard } from "./authorization.guard";

@Injectable()
export class CustomerGuard extends AuthorizationGuard {
    constructor () {
        super(['customer']);
    }
}