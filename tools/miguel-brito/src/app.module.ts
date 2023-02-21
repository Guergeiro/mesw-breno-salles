import { JobsModule } from '@application/jobs/jobs.module';
import { environment } from '@configs/environment';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [environment],
    }),
    JobsModule
  ],
})
export class AppModule {}

