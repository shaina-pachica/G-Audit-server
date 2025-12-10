import { BelongsToMany, Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { User } from "./User.model";
import { UserRole } from "./UserRole.model";

@Table({ tableName: "Roles", freezeTableName: true })
export class Role extends Model {
  @PrimaryKey
  @Column({ autoIncrement: true })
  declare id: number

  @Column
  declare name: string

  @BelongsToMany(() => User, () => UserRole)
  declare users: User[]
}

