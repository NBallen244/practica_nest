/* eslint-disable prettier/prettier */
/*archivo src/museum/museum.service.spec.ts*/
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MuseumEntity } from './museum.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { MuseumService } from './museum.service';
import { faker } from '@faker-js/faker';


describe('MuseumService', () => {
 let service: MuseumService;
 let repository: Repository<MuseumEntity>;
 let museumsList: MuseumEntity[] = [];

 const seedDatabase = async () => {
   repository.clear();
   museumsList = [];
   for(let i = 0; i < 5; i++){
       const museum: MuseumEntity = await repository.save({
       name: faker.company.name(),
       description: faker.lorem.sentence(),
       address: faker.location.secondaryAddress(),
       city: faker.location.city(),
       image: faker.image.url()})
       museumsList.push(museum);
   }
 }

 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [MuseumService],
   }).compile();

   service = module.get<MuseumService>(MuseumService);
   repository = module.get<Repository<MuseumEntity>>(getRepositoryToken(MuseumEntity));
  await seedDatabase();
 });
  
 it('should be defined', () => {
   expect(service).toBeDefined();
 });

 it('findAll should return all museums', async () => {
   const museums: MuseumEntity[] = await service.findAll();
   expect(museums).not.toBeNull();
   expect(museums).toHaveLength(museumsList.length);
 });

});
