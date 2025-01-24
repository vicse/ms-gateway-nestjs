import { OrderStatus } from '../enum/order-status.enum';
import { IsEnum } from 'class-validator';

export class StatusDto {
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
