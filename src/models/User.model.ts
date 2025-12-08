import { BelongsToMany, Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { Role } from "./Role.model";
import { UserRole } from "./UserRole.model";

@Table({ tableName: "User", freezeTableName: true })
export class User extends Model {
  @PrimaryKey
  @Column({ autoIncrement: true })
  declare id: number

  @Column
  declare username: string

  @Column
  declare password: string

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @BelongsToMany(() => Role, () => UserRole)
  declare roles: Role[]

}
