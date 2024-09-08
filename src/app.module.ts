import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { ProjectsController } from './projects/projects.controller';
import { ProjectsService } from './projects/projects.service';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [UsersModule, ProjectsModule],
  controllers: [UsersController, ProjectsController],
  providers: [UsersService, ProjectsService],
})
export class AppModule {}
