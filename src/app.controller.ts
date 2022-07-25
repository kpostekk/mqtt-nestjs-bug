import { Controller, Get } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('#')
  getBeat(@Payload() p: string, @Ctx() context: MqttContext) {
    console.log(context);
    console.log(p);
    return 'ok';
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
