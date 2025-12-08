import { Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "./User.model";
import { Role } from "./Role.model";

@Table({ tableName: "UserRole", freezeTableName: true })
export class UserRole extends Model {
  @PrimaryKey
  @Column({ autoIncrement: true })
  declare id: number

  @ForeignKey(() => User)
  @Column
  declare user_id: number

  @ForeignKey(() => Role)
  @Column
  declare role_id: number

}
