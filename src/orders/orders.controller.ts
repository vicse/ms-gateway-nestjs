import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateOrderDto } from './dto';
import { Services } from '../common/constants';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { OrderPaginationDto } from './dto';
import { PaginationDto } from '../common/dto';
import { OrderStatus } from './enum/order-status.enum';
import { StatusDto } from './dto/status.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(Services.NATS_SERVICE)
    private readonly ordersClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder', createOrderDto);
  }

  @Get()
  findAll(@Query() paginationDto: OrderPaginationDto) {
    return this.ordersClient.send('findAllOrders', paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await firstValueFrom(
        this.ordersClient.send('findOneOrder', { id }),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('status/:status')
  findAllByStatus(
    @Param('status', new ParseEnumPipe(OrderStatus)) status: OrderStatus,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.ordersClient.send('findAllOrders', {
      status,
      ...paginationDto,
    });
  }

  @Patch(':id')
  async changeStatusOrder(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto,
  ) {
    try {
      return await firstValueFrom(
        this.ordersClient.send('changeOrderStatus', { id, ...statusDto }),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
