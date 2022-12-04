import { UserModule } from "./../user/user.module";
import { Module } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { ProjectController } from "./project.controller";
import { ProjectModel } from "./project.model";

@Module({
    controllers: [ProjectController],
    providers: [ProjectService, ProjectModel],
    exports: [ProjectModel],
    imports: [UserModule],
})
export class ProjectModule {}
