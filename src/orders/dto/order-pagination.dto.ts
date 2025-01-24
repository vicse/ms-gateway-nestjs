import { OrderStatus } from '../enum/order-status.enum';
import { PaginationDto } from '../../common/dto';
import { IsEnum, IsOptional } from 'class-validator';

export class OrderPaginationDto extends PaginationDto {
  @IsOptional()
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
