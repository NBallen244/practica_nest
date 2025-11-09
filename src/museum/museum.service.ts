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

    async findAll(): Promise<MuseumEntity[]> {
        return await this.museumRepository.find({ relations: ['exhibitions', 'artworks'] });
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
