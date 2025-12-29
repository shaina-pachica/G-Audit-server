import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({ tableName: "Statistics", freezeTableName: true })
export class Statistics extends Model {
  @PrimaryKey
  @Column({ autoIncrement: true })
  declare id: number

  @Column
  declare date: Date

  @Column
  declare starting_balance: number

  @Column
  declare ending_balance: number

  @Column
  declare debit: number

  @Column
  declare credit: number
}
