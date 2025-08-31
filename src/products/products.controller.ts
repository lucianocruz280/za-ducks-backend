import { Controller, Get, Query } from '@nestjs/common'
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger'
import { ProductsService } from './products.service'

@ApiTags('search')
@Controller('search')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Get()
  @ApiQuery({ name: 'q', required: true })
  @ApiQuery({ name: 'skip', required: false, schema: { default: 0 } })
  @ApiQuery({ name: 'take', required: false, schema: { default: 20 } })
  @ApiOkResponse({ description: 'Búsqueda por título exacto o brand/descr (contains, >=3). Si q es palíndromo => 50%.' })
  async search(@Query('q') q: string, @Query('skip') skip?: string, @Query('take') take?: string) {
    return this.service.search(q, Number(skip ?? 0), Number(take ?? 20))
  }
}
