import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { PhoneNumber } from "./PhoneNumber";

@Table({
  timestamps: false,
  tableName: "account",
})

export class Account extends Model {
  @Column({
    primaryKey: true,
    type: DataType.NUMBER,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  auth_id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username!: string;

  @HasMany(() => PhoneNumber)
  phoneNumbers?: PhoneNumber[]
}
