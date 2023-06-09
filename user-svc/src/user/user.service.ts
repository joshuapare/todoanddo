import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { ValidateUserDto } from './dto/validate-user.dto';
import { Op } from 'sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = new User({
      ...createUserDto,
    });
    return user.save();
  }

  async findAll() {
    return this.userModel.findAll();
  }

  async findOne(id: number) {
    return this.userModel.findByPk(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByPk(id);
    user.set(updateUserDto);
    await user.save();
    return user;
  }

  async remove(id: number) {
    const user = await this.userModel.findByPk(id);
    user.destroy();
    return user;
  }

  async validate(data: ValidateUserDto) {
    const user = await this.userModel.findOne({
      where: {
        [Op.or]: [{ email: data.email }, { username: data.username }],
      },
    });
    if (!user) {
      return { success: false, data: null };
    }
    return user.validatePassword(data.password);
  }
}
