import { Injectable } from "@nestjs/common";
import { AuthorizationGuard } from "./authorization.guard";
import { Role } from "src/enums";

@Injectable()
export class AdminGuard extends AuthorizationGuard {
    constructor () {
        super([Role.ADMIN, Role.SUPERADMIN]);
    }
}