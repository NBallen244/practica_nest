/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { MuseumService } from './museum.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { MuseumDto } from './museum.dto';
import { MuseumEntity } from './museum.entity';
import { plainToInstance } from 'class-transformer';

@Controller('museums')
@UseInterceptors(BusinessErrorsInterceptor)
export class MuseumController {
    constructor(private readonly museumService: MuseumService) {}

    @Get()
    async findAll() {
        return await this.museumService.findAll();
    }

    @Get(':museum_id')
    async findOne(@Param('museum_id') id: string) {
        return await this.museumService.findOne(id);
    }

    @Post()
    async create(@Body() museumDto: MuseumDto) {
        const museum: MuseumEntity = plainToInstance(MuseumEntity, museumDto);
        return await this.museumService.create(museum);
    }

    @Put(':museumId')
    async update(@Param('museumId') museumId: string, @Body() museumDto: MuseumDto) {
        const museum: MuseumEntity = plainToInstance(MuseumEntity, museumDto);
        return await this.museumService.update(museumId, museum);
    }

    @Delete(':museumId')
    @HttpCode(204)
    async delete(@Param('museumId') museumId: string) {
        return await this.museumService.delete(museumId);
    }
}
