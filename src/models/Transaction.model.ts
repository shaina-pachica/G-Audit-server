import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "./User.model";

@Table({ tableName: "Transactions", freezeTableName: true })
export class Transaction extends Model {
  @PrimaryKey
  @Column({ autoIncrement: true })
  declare id: number

  @ForeignKey(() => User)
  @Column
  declare user_id: number

  @Column
  declare date: Date

  @Column
  declare description: string

  @Column
  declare reference: string

  @Column
  declare amount: number

  @Column
  declare balance: number

  @BelongsTo(() => User)
  declare user: User
}
