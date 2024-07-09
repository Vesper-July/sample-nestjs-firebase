import { IsString, IsNotEmpty, IsDefined, IsOptional } from "class-validator";

export class ItemDto {
    @IsString()
    id: string
  
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    title: string
  
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    subtitle: string
  
    @IsString()
    @IsOptional()
    description: string
}