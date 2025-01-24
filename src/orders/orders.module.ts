import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Services } from '../common/constants';
import { envs } from '../common/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: Services.NATS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: envs.natsServers,
        },
      },
    ]),
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
