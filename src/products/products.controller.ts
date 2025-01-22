import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Services } from '../common/constants';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from '../common/dto';
import { firstValueFrom } from 'rxjs';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(Services.PRODUCT_SERVICE)
    private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  createProduct() {
    return 'crea producto';
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send(
      { cmd: 'find_all_products' },
      paginationDto,
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const product = await firstValueFrom(
        this.productsClient.send({ cmd: 'find_one_product' }, { id }),
      );
      return product;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() product: any) {
    return `actualiza producto ${id}`;
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return `elimina un producto ${id}`;
  }
}
