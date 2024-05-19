import { Module } from '@nestjs/common';
import { ConfigurationsModule } from './configurations/configurations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigurationPostgres } from './configurations/database.configurations';
import { UsersModule } from './users/users.module';
import { MedicsModule } from './medics/medics.module';
import { PatientsModule } from './patients/patients.module';

@Module({
  imports: [
    ConfigurationsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationsModule],
      useClass: DatabaseConfigurationPostgres,
    }),
    UsersModule,
    MedicsModule,
    PatientsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
