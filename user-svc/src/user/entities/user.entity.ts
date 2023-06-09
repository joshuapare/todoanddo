import { BeforeCreate, Column, Model, Table } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

@Table
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({
    unique: true,
    allowNull: false,
  })
  username: string;

  @Column({ allowNull: false })
  password: string;

  @Column({ allowNull: false })
  name: string;

  @Column({
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @BeforeCreate
  static async hashPassword(instance: User) {
    const salt = bcrypt.genSaltSync();
    instance.password = bcrypt.hashSync(instance.password, salt);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compareSync(password, this.password);
  }
}
