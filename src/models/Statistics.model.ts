import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "./User.model";

@Table({ tableName: "Statistics", freezeTableName: true })
export class Statistics extends Model {
  @PrimaryKey
  @Column({ autoIncrement: true })
  declare id: number

  @ForeignKey(() => User)
  @Column
  declare user_id: number

  @Column({ type: DataType.DATEONLY })
  declare date: string

  @Column
  declare starting_balance: number

  @Column
  declare ending_balance: number

  @Column
  declare debit: number

  @Column
  declare credit: number

  @BelongsTo(() => User)
  declare user: User
}
