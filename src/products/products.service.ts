import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ILike, Repository } from 'typeorm'
import { Product } from './product.entity'
import { isPalindrome } from 'src/common/utils/palindrome.utils'


type SearchResult = {
  items: Array<{
    id: string
    title: string
    brand: string
    description: string
    price: number
    currency: string
    originalPrice?: number
    discountApplied?: boolean
  }>
  palindrome: boolean
  total: number
}

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) { }

  async search(qRaw: string, skip = 0, take = 20): Promise<SearchResult> {
    const q = (qRaw ?? '').trim()
    const palindrome = isPalindrome(q)

    if (!q) return { items: [], palindrome, total: 0 }

    // Regla 3: título exacto
    const byTitle = await this.repo.findOne({ where: { title: q } })
    if (byTitle) {
      return { items: [this.map(byTitle, palindrome)], palindrome, total: 1 }
    }

    // Regla 4: brand/descr
    if (q.length < 3) return { items: [], palindrome, total: 0 }

    const [list, total] = await this.repo.findAndCount({
      where: [
        { brand: ILike(`%${q}%`) },
        { description: ILike(`%${q}%`) },
      ],
      order: { createdAt: 'DESC' },
      skip,
      take,
    })

    return { items: list.map(p => this.map(p, palindrome)), palindrome, total }
  }

  private map(p: Product, palindrome: boolean) {
    if (!palindrome) {
      return {
        id: p.id, title: p.title, brand: p.brand, description: p.description,
        price: p.price, currency: p.currency,
      }
    }
    const discounted = Math.round(p.price * 0.5)
    return {
      id: p.id, title: p.title, brand: p.brand, description: p.description,
      price: discounted, currency: p.currency,
      originalPrice: p.price, discountApplied: true,
    }
  }

  async findAll(skip = 0, take = 20): Promise<SearchResult> {
    if (skip < 0) skip = 0;
    if (take < 1) take = 1;
    if (take > 100) take = 100;

    const [list, total] = await this.repo.findAndCount({
      order: { createdAt: 'DESC' },
      skip,
      take,
    });

    // NO aplica descuento aquí
    return {
      items: list.map((p) => this.map(p, false)),
      palindrome: false,
      total,
    };
  }

}
