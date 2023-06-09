import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RpcValidationFilter } from 'src/pipes/validation-filter.pipe';
import { ValidateUserDto } from './dto/validate-user.dto';

@UseFilters(new RpcValidationFilter())
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('user.create')
  create(@Payload() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @MessagePattern('user.find')
  findAll() {
    return this.userService.findAll();
  }

  @MessagePattern('user.find.one')
  findOne(@Payload() id: number) {
    return this.userService.findOne(id);
  }

  @MessagePattern('user.update')
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern('user.delete')
  remove(@Payload() id: number) {
    return this.userService.remove(id);
  }

  @MessagePattern('user.validate')
  validate(@Payload() data: ValidateUserDto) {
    return this.userService.validate(data);
  }
}
