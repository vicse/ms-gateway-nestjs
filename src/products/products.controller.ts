import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}

  @Post()
  createProduct() {
    return 'crea producto';
  }

  @Get()
  findAll() {
    return 'retorna productos';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `retorna producto ${id}`;
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
