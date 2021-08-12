import { Module } from "@nestjs/common";
import { SourcesModule } from "../sources/sources.module";

@Module({
    imports: [SourcesModule]
})
export class CommissionsModule {}
