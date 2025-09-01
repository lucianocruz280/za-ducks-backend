import { Controller, Get, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  // GET /api/products  (listar paginado, SIN descuento)
  @Get()
  @ApiQuery({ name: 'skip', required: false, schema: { default: 0, minimum: 0 } })
  @ApiQuery({ name: 'take', required: false, schema: { default: 20, minimum: 1, maximum: 100 } })
  @ApiOkResponse({ description: 'Lista paginada de productos (sin descuentos).' })
  findAll(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(20), ParseIntPipe) take: number,
  ) {
    if (skip < 0) skip = 0;
    if (take < 1) take = 1;
    if (take > 100) take = 100;
    return this.service.findAll(skip, take);
  }

  // GET /api/products/search  (búsqueda con reglas + descuento si q es palíndromo)
  @Get('search')
  @ApiQuery({ name: 'q', required: true })
  @ApiQuery({ name: 'skip', required: false, schema: { default: 0 } })
  @ApiQuery({ name: 'take', required: false, schema: { default: 20 } })
  @ApiOkResponse({
    description:
      'Búsqueda por título exacto o brand/descr (contains, >=3). Si q es palíndromo => 50%.',
  })
  search(
    @Query('q') q: string,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(20), ParseIntPipe) take: number,
  ) {
    return this.service.search(q, skip, take);
  }
}
