import { Module } from "@nestjs/common";
import { ReportsStoriesService } from "./reports-stories.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReportsStoriesRepository } from "./reports-stories.repository";

@Module({
    imports: [TypeOrmModule.forFeature([ReportsStoriesRepository])],
    providers: [ReportsStoriesService]
})
export class ReportsStoriesModule {}
