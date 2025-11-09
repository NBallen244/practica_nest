/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsNumber, IsString, IsUrl} from 'class-validator';
export class MuseumDto {

 @IsString()
 @IsNotEmpty()
 readonly name: string;
 
 @IsString()
 @IsNotEmpty()
 readonly description: string;
 
 @IsString()
 @IsNotEmpty()
 readonly address: string;
 
 @IsString()
 @IsNotEmpty()
 readonly city: string;
 
 @IsUrl()
 @IsNotEmpty()
 readonly image: string;

 @IsNotEmpty()
 @IsNumber()
 readonly founded_before: number;

}
/* archivo: src/museum/museum.dto.ts */