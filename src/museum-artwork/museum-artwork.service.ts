/* archivo: src/museum-artwork/museum-artwork.service.ts */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtworkEntity } from '../artwork/artwork.entity';
import { MuseumEntity } from '../museum/museum.entity';
import { Repository } from 'typeorm';
import { BussinessLogicException, BussinessError } from '../shared/errors/bussiness-errors';

@Injectable()
export class MuseumArtworkService {
   constructor(
       @InjectRepository(MuseumEntity)
       private readonly museumRepository: Repository<MuseumEntity>,
   
       @InjectRepository(ArtworkEntity)
       private readonly artworkRepository: Repository<ArtworkEntity>
   ) {}

   async addArtworkMuseum(museumId: string, artworkId: string): Promise<MuseumEntity> {
       const artwork: ArtworkEntity|null = await this.artworkRepository.findOne({where: {id: artworkId}});
       if (!artwork)
         throw new BussinessLogicException("The artwork with the given id was not found", BussinessError.NOT_FOUND);
     
       const museum: MuseumEntity|null = await this.museumRepository.findOne({where: {id: museumId}, relations: ["artworks", "exhibitions"]})
       if (!museum)
         throw new BussinessLogicException("The museum with the given id was not found", BussinessError.NOT_FOUND);
   
       museum.artworks = [...museum.artworks, artwork];
       return await this.museumRepository.save(museum);
     }
   
   async findArtworkByMuseumIdArtworkId(museumId: string, artworkId: string): Promise<ArtworkEntity> {
       const artwork: ArtworkEntity|null = await this.artworkRepository.findOne({where: {id: artworkId}});
       if (!artwork)
         throw new BussinessLogicException("The artwork with the given id was not found", BussinessError.NOT_FOUND)
      
       const museum: MuseumEntity|null = await this.museumRepository.findOne({where: {id: museumId}, relations: ["artworks"]});
       if (!museum)
         throw new BussinessLogicException("The museum with the given id was not found", BussinessError.NOT_FOUND)
  
       const museumArtwork: ArtworkEntity|undefined = museum.artworks.find(e => e.id === artwork.id);
  
       if (!museumArtwork)
         throw new BussinessLogicException("The artwork with the given id is not associated to the museum", BussinessError.PRECONDITION_FAILED)
  
       return museumArtwork;
   }
   
   async findArtworksByMuseumId(museumId: string): Promise<ArtworkEntity[]> {
       const museum: MuseumEntity|null = await this.museumRepository.findOne({where: {id: museumId}, relations: ["artworks"]});
       if (!museum)
         throw new BussinessLogicException("The museum with the given id was not found", BussinessError.NOT_FOUND)
      
       return museum.artworks;
   }
   
   async associateArtworksMuseum(museumId: string, artworks: ArtworkEntity[]): Promise<MuseumEntity> {
       const museum: MuseumEntity|null = await this.museumRepository.findOne({where: {id: museumId}, relations: ["artworks"]});
   
       if (!museum)
         throw new BussinessLogicException("The museum with the given id was not found", BussinessError.NOT_FOUND)
   
       for (let i = 0; i < artworks.length; i++) {
         const artwork: ArtworkEntity|null = await this.artworkRepository.findOne({where: {id: artworks[i].id}});
         if (!artwork)
           throw new BussinessLogicException("The artwork with the given id was not found", BussinessError.NOT_FOUND)
       }
   
       museum.artworks = artworks;
       return await this.museumRepository.save(museum);
     }
   
   async deleteArtworkMuseum(museumId: string, artworkId: string){
       const artwork: ArtworkEntity|null = await this.artworkRepository.findOne({where: {id: artworkId}});
       if (!artwork)
         throw new BussinessLogicException("The artwork with the given id was not found", BussinessError.NOT_FOUND)
   
       const museum: MuseumEntity|null = await this.museumRepository.findOne({where: {id: museumId}, relations: ["artworks"]});
       if (!museum)
         throw new BussinessLogicException("The museum with the given id was not found", BussinessError.NOT_FOUND)
   
       const museumArtwork: ArtworkEntity|undefined = museum.artworks.find(e => e.id === artwork.id);
   
       if (!museumArtwork)
           throw new BussinessLogicException("The artwork with the given id is not associated to the museum", BussinessError.PRECONDITION_FAILED)

       museum.artworks = museum.artworks.filter(e => e.id !== artworkId);
       await this.museumRepository.save(museum);
   }  
}