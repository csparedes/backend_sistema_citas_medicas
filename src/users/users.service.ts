import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { throws } from 'assert';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepo.create(createUserDto);
      return await this.userRepo.save(user);
    } catch (error) {
      this.handleError(error); 
    }
  }

  findAll() {
    try {
      const users = this.userRepo.find();
      if(!users){
        throw new BadRequestException('No users found')
      }
      return users;
    } catch (error) {
      this.handleError(error);
    }
  }

  findOne(id: number) {
    try {
      const user = this.userRepo.findOne({where: {user_id: id}});
      if(!user){
        throw new BadRequestException('User not found')
      }
      return user;
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepo.update(id, updateUserDto);
      if(user.affected === 0){
        throw new BadRequestException('User not found or not updated')
      }
      return await this.findOne(id)
    } catch (error) {
      this.handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const user = await this.findOne(id);
      return this.userRepo.remove(user);
    } catch (error) {
      
    }
  }

  private handleError(error: Error) {
    this.logger.error(error);
    throw new BadRequestException(error.message)
  }
}
