import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { Public } from "./common/decorators";

@Controller("")
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Public()
    @Get()
    getHello() {
        return this.appService.getHello();
    }
}
