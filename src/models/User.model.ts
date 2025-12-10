import { BelongsToMany, Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { Role } from "./Role.model";
import { UserRole } from "./UserRole.model";

@Table({ tableName: "Users", freezeTableName: true })
export class User extends Model {
  @PrimaryKey
  @Column({ autoIncrement: true })
  declare id: number

  @Column
  declare name: string

  @Column
  declare password: string

  @BelongsToMany(() => Role, () => UserRole)
  declare roles: Role[]

}
