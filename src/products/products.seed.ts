import { DataSource } from 'typeorm'
import { Product } from './product.entity'

export async function seed(ds: DataSource) {
  const repo = ds.getRepository(Product)
  const count = await repo.count()
  if (count > 0) return

  await repo.save([
    { title: 'Air Max 90', brand: 'Nike', description: 'Clásicos de running', price: 299900, currency: 'MXN' },
    { title: 'Ultraboost 22', brand: 'Adidas', description: 'Amortiguación premium', price: 359900, currency: 'MXN' },
    { title: 'Classic Leather', brand: 'Reebok', description: 'Icono urbano', price: 189900, currency: 'MXN' },
    { title: 'Old Skool', brand: 'Vans', description: 'Skate atemporal', price: 149900, currency: 'MXN' },
    { title: 'Civic', brand: 'ZA', description: 'Tenis ligeros para diario', price: 99900, currency: 'MXN' },
  ])
}
