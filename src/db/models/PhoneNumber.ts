import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Account } from "./Account";

@Table({
  timestamps: false,
  tableName: "phone_number",
})

export class PhoneNumber extends Model {
  @Column({
    primaryKey: true,
    type: DataType.NUMBER,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  number!: string;

  @ForeignKey(() => Account)
  account_id!: number

  @BelongsTo(() => Account)
  account?: Account
}
