import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeEntity } from './entities/recipe.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecipesService {
  private readonly logger = new Logger(RecipesService.name)

  constructor(
    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>
  ){}

  create(createRecipeDto: CreateRecipeDto) {
    try {
      const recipe = this.recipeRepository.create(createRecipeDto)
      return this.recipeRepository.save(recipe)
    } catch (error) {
      this.handleError(error)
    }
  }

  findAll() {
    try {
      const recipes = this.recipeRepository.find()
      if(!recipes){
        throw new BadRequestException('No recipes found')
      }
      return recipes
    } catch (error) {
      this.handleError(error)
    }
  }

  findOne(id: number) {
    try {
      const recipe = this.recipeRepository.findOne({where: {recipe_id: id}})
      if(!recipe){
        throw new BadRequestException('Recipe not found')
      }
      return recipe
    } catch (error) {
      this.handleError(error)
    }
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto) {
    try {
      const recipe = await this.recipeRepository.update(id, updateRecipeDto)
      if(recipe.affected === 0){
        throw new BadRequestException('Recipe not found or not updated')
      }
      return this.findOne(id)
    } catch (error) {
      this.handleError(error)
    }
  }

  remove(id: number) {
    try {
      const recipe = this.recipeRepository.delete(id)
      if(!recipe){
        throw new BadRequestException('Recipe not found or not deleted')
      }
      return recipe
    } catch (error) {
      this.handleError(error)
    }
  }

  private handleError(error: Error){
    this.logger.error(error.message, error.stack)
    throw new BadRequestException(error.message)
  }
}
