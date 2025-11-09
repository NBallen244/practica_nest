/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MuseumEntity } from './museum.entity';
import { Repository } from 'typeorm';
import { BussinessError, BussinessLogicException } from '../shared/errors/bussiness-errors';

@Injectable()
export class MuseumService {
    constructor(
        @InjectRepository(MuseumEntity)
        private readonly museumRepository: Repository<MuseumEntity>,
    ) {}

    async findAll(city?: string, name?: string, founded_before?: number, page?: number, limit?: number): Promise<{page:number, limit:number, total:number, museums: MuseumEntity[]}> {
        const museums = await this.museumRepository.find({ relations: ['exhibitions', 'artworks'] });
        let filteredMuseums = museums;

        if (city) {
            filteredMuseums = filteredMuseums.filter(museum => museum.city.toLowerCase() === city.toLowerCase());
        }
        if (name) {
            filteredMuseums = filteredMuseums.filter(museum => museum.name.toLowerCase().includes(name.toLowerCase()));
        }
        if (founded_before) {
            filteredMuseums = filteredMuseums.filter(museum => museum.founded_before < founded_before);
        }

        const usedLimit:number = limit && limit > 0 ? limit : 10;
        let usedPage:number;

        if (usedLimit >= filteredMuseums.length) {
            usedPage = 1;
        }else{
            usedPage = page && page > 0 ? page : 1;
        }
        let startIndex = (usedPage - 1) * usedLimit;
        if (startIndex >= filteredMuseums.length) {
            usedPage = Math.ceil(filteredMuseums.length / usedLimit);
            startIndex = (usedPage - 1) * usedLimit;
        }
        const endIndex = startIndex + usedLimit;

        return {page:usedPage, limit:usedLimit, total: filteredMuseums.length, museums: filteredMuseums.slice(startIndex, endIndex)};
    }

    async findOne(id: string): Promise<MuseumEntity> {
        const museum : MuseumEntity|null= await this.museumRepository.findOne({ where: { id }, relations: ['exhibitions', 'artworks'] });
        if (!museum){
            throw new BussinessLogicException("The museum with the given id was not found", BussinessError.NOT_FOUND);
        }
        return museum;
    }

    async create(museum: MuseumEntity): Promise<MuseumEntity> {
       return await this.museumRepository.save(museum);
    }

    async update(id: string, museum: MuseumEntity): Promise<MuseumEntity> {
       const persistedMuseum: MuseumEntity | null = await this.museumRepository.findOne({where:{id}});
       if (!persistedMuseum)
         throw new BussinessLogicException("The museum with the given id was not found", BussinessError.NOT_FOUND);
       
       return await this.museumRepository.save({...persistedMuseum, ...museum});
    }

    async delete(id: string) {
       const museum: MuseumEntity | null = await this.museumRepository.findOne({where:{id}});
       if (!museum)
         throw new BussinessLogicException("The museum with the given id was not found", BussinessError.NOT_FOUND);
    
       await this.museumRepository.remove(museum);
    }
}
