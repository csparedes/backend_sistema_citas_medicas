import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RecipeEntity } from './entities/recipe.entity';

@Controller('recipes')
@ApiTags('Recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  @ApiResponse({status: 201, description: 'The record has been created', type: RecipeEntity})
  @ApiResponse({status: 400, description: 'Bad Request'})
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipesService.create(createRecipeDto);
  }

  @Get()
  @ApiResponse({status: 200, description: 'The records have been successfully retrieved', type: [RecipeEntity]})
  @ApiResponse({status: 400, description: 'Bad Request'})
  findAll() {
    return this.recipesService.findAll();
  }

  @Get(':id')
  @ApiResponse({status: 200, description: 'The record has been successfully retrieved', type: RecipeEntity})
  @ApiResponse({status: 400, description: 'Bad Request'})
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({status: 200, description: 'The record has been successfully updated', type: RecipeEntity})
  @ApiResponse({status: 400, description: 'Bad Request'})
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipesService.update(+id, updateRecipeDto);
  }

  @Delete(':id')
  @ApiResponse({status: 200, description: 'The record has been successfully deleted', type: RecipeEntity})
  @ApiResponse({status: 400, description: 'Bad Request'})
  remove(@Param('id') id: string) {
    return this.recipesService.remove(+id);
  }
}
