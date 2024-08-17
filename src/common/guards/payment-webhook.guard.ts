import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import {getClientIp} from 'request-ip'
const webhookWhiteList = '35.242.133.146'
@Injectable()
export class PaymentWebhookGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const httpCtx = context.switchToHttp()
        const request = httpCtx.getRequest()
        const clientIP = getClientIp(request)
        if (clientIP !== webhookWhiteList) return false
        return true
    }
}