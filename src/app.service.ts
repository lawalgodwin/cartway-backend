import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHomePage() {
        return "Welcome Home"
    }
}
