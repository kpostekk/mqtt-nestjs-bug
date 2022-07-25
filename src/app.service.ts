import { Inject, Injectable } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common';
import { ClientProxy, MqttRecordBuilder } from '@nestjs/microservices';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(@Inject('MQTT') private readonly client: ClientProxy) {}

  onModuleInit() {
    setInterval(() => {
      const record = new MqttRecordBuilder('some text')
        .setProperties({
          responseTopic: 'response',
          userProperties: {
            'x-hello': 'world',
          },
        })
        .build();
      this.client.emit('test/test', record);
    }, 1000);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
