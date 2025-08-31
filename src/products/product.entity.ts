import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Index()
  @Column({ length: 200 })
  title!: string

  @Index()
  @Column({ length: 120 })
  brand!: string

  @Index()
  @Column({ type: 'text' })
  description!: string

  @Column({ type: 'int' })
  price!: number

  @Column({ default: 'MXN' })
  currency!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
