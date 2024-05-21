import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeEntity } from './entities/recipe.entity';

@Module({
  controllers: [RecipesController],
  providers: [RecipesService],
  imports: [
    TypeOrmModule.forFeature([RecipeEntity])
  ]
})
export class RecipesModule {}
