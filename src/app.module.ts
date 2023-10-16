import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot(), // Import the ConfigModule to load configuration values
        MongooseModule.forRootAsync({
            imports: [ConfigModule], // Import the ConfigModule again to access configuration values
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGODB_URI'),
            }),
            inject: [ConfigService],
        }), UsersModule, AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}