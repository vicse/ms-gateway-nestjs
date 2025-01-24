import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Services } from '../common/constants';
import { envs } from '../common/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: Services.ORDER_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.ordersMsHost,
          port: envs.ordersMsPort,
        },
      },
    ]),
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
