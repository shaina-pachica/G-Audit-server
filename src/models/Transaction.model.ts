import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "./User.model";
import { Statistics } from "./Statistics.model";

@Table({ tableName: "Transactions", freezeTableName: true })
export class Transaction extends Model {
  @PrimaryKey
  @Column({ autoIncrement: true })
  declare id: number


  @ForeignKey(() => Statistics)
  @Column
  declare stat_id: number

  @Column
  declare description: string

  @Column
  declare reference: string

  @Column
  declare amount: number

  @Column
  declare balance: number


  @BelongsTo(() => Statistics)
  declare timeframe: Statistics
}
