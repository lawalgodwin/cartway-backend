import { Injectable } from "@nestjs/common";
import { AuthorizationGuard } from "./authorization.guard";

@Injectable()
export class VendorGuard extends AuthorizationGuard {
    constructor () {
        super(['vendor']);
    }
}