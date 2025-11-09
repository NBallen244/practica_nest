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
   /* Manejaremos 20 museos para las pruebas del filtro y paginacion */
   for(let i = 0; i < 20; i++){
       const museum: MuseumEntity = await repository.save({
       name: faker.company.name(),
       description: faker.lorem.sentence(),
       address: faker.location.secondaryAddress(),
       city: faker.location.city(),
       image: faker.image.url(),
       founded_before: faker.number.int({ min: 1800, max: 2023}),
      });
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

 /* Pruebas sobre findAll para le manejo de filtros y paginacion */
 it('Al no pasar queries, debería retornar la pagina 1 y los primeros 10 museos, indicandose así en los metadatos', async () => {
   const dataMuseo = await service.findAll();
   /*No es nulo*/
   expect(dataMuseo.museums).not.toBeNull();
    /*Cantidad de museos devueltos es 10 por defecto*/
   expect(dataMuseo.museums.length).toBe(10);
    /*La primera página*/
   expect(dataMuseo.page).toBe(1);
    /*El límite por defecto es 10*/
   expect(dataMuseo.limit).toBe(10);
    /*Los museos retornados corresponden a los primeros dias al ser la primera pagina*/
   const primerosDiezMuseos = museumsList.slice(0,10);
   for (let i = 0; i < 10; i++) {
     expect(dataMuseo.museums[i].id).toBe(primerosDiezMuseos[i].id);
   }
 });

 it('Al pasar una pagina y limite, debería retornar los museos correspondientes a esa pagina y limite, indicandose así en los metadatos', async () => {
  /*Página 2, límite 5*/
   const dataMuseo = await service.findAll(undefined, undefined, undefined, 2, 5);
   /*No es nulo*/
   expect(dataMuseo.museums).not.toBeNull();
    /*Cantidad de museos devueltos es 5*/
   expect(dataMuseo.museums.length).toBe(5);
    /*La segunda página*/
   expect(dataMuseo.page).toBe(2);  
    /*El límite es 5*/
   expect(dataMuseo.limit).toBe(5);
   /*Los museos retornados son del sexto al décimo por ser la segunda pagina de 5 elementos*/
   const museosPaginaDos = museumsList.slice(5,10);
   for (let i = 0; i < 5; i++) {
    expect(dataMuseo.museums[i].id).toBe(museosPaginaDos[i].id);
    }
 });

 it('Si el límite es mayor a la cantidad de museos, debería retornar la página 1 con todos los museos, independiente de la pagina indicada', async () => {
   const dataMuseo = await service.findAll(undefined, undefined, undefined, 2, 25);
    /*No es nulo*/
    expect(dataMuseo.museums).not.toBeNull();
    /*La página debe ser 1, ya que el límite es mayor a la cantidad de museos*/
    expect(dataMuseo.page).toBe(1);
    /*El límite debe ser 25*/
    expect(dataMuseo.limit).toBe(25);
    /*La cantidad de museos devueltos debe ser igual a la cantidad total de museos en la base de datos*/
    expect(dataMuseo.museums.length).toBe(museumsList.length);
 });

 it('Si la ultima pagina no tiene la cantidad de elementos del limite, debería retornar solo los elementos restantes', async () => {
    const dataMuseo = await service.findAll(undefined, undefined, undefined, 3, 8);
    /*No es nulo*/
    expect(dataMuseo.museums).not.toBeNull();
    /*La página debe ser 3*/
    expect(dataMuseo.page).toBe(3);
    /*El límite debe ser 8*/
    expect(dataMuseo.limit).toBe(8);
    /*La cantidad de museos devueltos debe ser 4, que son los que corresponden a la tercera pagina*/
    expect(dataMuseo.museums.length).toBe(4);
    /*Los museos retornados son del dieciseis al veinte por ser la ultima pagina de 8 elementos*/
    const museosPaginaTres = museumsList.slice(16,20);
    for (let i = 0; i < 4; i++) {
     expect(dataMuseo.museums[i].id).toBe(museosPaginaTres[i].id);
     }
  });

 it('Si se da un limite menor al total, pero una pagina muy alta, se retorna la ultima pagina con los elementos correspondientes', async () => {
    const dataMuseo = await service.findAll(undefined, undefined, undefined, 10, 10);
    /*No es nulo*/
    expect(dataMuseo.museums).not.toBeNull();
    /*La página debe ser 2, ya que solo hay 20 museos y el límite es 10*/
    expect(dataMuseo.page).toBe(2);
    /*El límite debe ser 10*/
    expect(dataMuseo.limit).toBe(10);
    /*La cantidad de museos devueltos debe ser 10, que son los que corresponden a la segunda pagina*/
    expect(dataMuseo.museums.length).toBe(10);
    /*Los museos retornados son del once al veinte por ser la ultima pagina de 10 elementos*/
    const museosPaginaDos = museumsList.slice(10,20);
    for (let i = 0; i < 10; i++) {
     expect(dataMuseo.museums[i].id).toBe(museosPaginaDos[i].id);
     }
 });

 it('al usarse el filtro ciudad, debería retornar solo los museos de esa ciudad', async () => {
   const ciudadFiltro=faker.location.city()+"Testing";
   /*Modificar algunos museos para que pertenezcan a la ciudad filtro*/
   museumsList[0].city=ciudadFiltro;
   museumsList[1].city=ciudadFiltro;
   await repository.save(museumsList[0]);
   await repository.save(museumsList[1]);

   const dataMuseo = await service.findAll(ciudadFiltro);
   /*Cantidad de museos devueltos es 2 pues fueron dos los de dicha ciudad*/
   expect(dataMuseo.museums.length).toBe(2);
   for (const museum of dataMuseo.museums) {
    /*Cada museo retornado debe pertenecer a la ciudad filtro*/
     expect(museum.city).toBe(ciudadFiltro);
   }
 });

 it('al usarse el filtro nombre, debería retornar solo los museos que contengan ese nombre', async () => {
   const nombreFiltro=faker.company.name()+"Testing";
   /*Modificar algunos museos para que contengan el nombre filtro*/
    museumsList[0].name=nombreFiltro+" A";
    museumsList[1].name=nombreFiltro+" B";
    await repository.save(museumsList[0]);
    await repository.save(museumsList[1]);

   const dataMuseo = await service.findAll(undefined, nombreFiltro);
    /*Cantidad de museos devueltos es 2 pues fueron dos los que contenian ese nombre*/
   expect(dataMuseo.museums.length).toBe(2);
   for (const museum of dataMuseo.museums) {
    /*Cada museo retornado debe contener el nombre filtro*/
     expect(museum.name).toContain(nombreFiltro);
   }
 });
 
 it('al usarse el filtro founded_before, debería retornar solo los museos fundados antes de ese año', async () => {
    const foundedBeforeFiltro=faker.number.int({ min: 1900, max: 2023});
    /*Modificar algunos museos para que cumplan con el filtro*/
    museumsList[0].founded_before=foundedBeforeFiltro - 10;
    museumsList[1].founded_before=foundedBeforeFiltro - 5;
    museumsList[2].founded_before=foundedBeforeFiltro + 5;
    await repository.save(museumsList[0]);
    await repository.save(museumsList[1]);
    await repository.save(museumsList[2]);
    const dataMuseo = await service.findAll(undefined, undefined, foundedBeforeFiltro);
    /*Cantidad de museos devueltos debe ser minimo de 2*/
    expect(dataMuseo.museums.length).toBeGreaterThanOrEqual(2);
    for (const museum of dataMuseo.museums) {
        /*Cada museo retornado debe haber sido fundado antes del año filtro*/
        expect(museum.founded_before).toBeLessThan(foundedBeforeFiltro);
        /*El museo[2] no puede estar por tener una fecha mayor*/
        expect(museum.id).not.toBe(museumsList[2].id);
    }
 });

 it('el uso de todos los filtros y paginacion debe funcionar correctamente', async () => {
    const ciudadFiltro=faker.location.city()+"Testing";
    const nombreFiltro=faker.company.name()+"Testing";
    const foundedBeforeFiltro=faker.number.int({ min: 1900, max: 2023});
    const pageFiltro=2;
    const limitFiltro=5;
    /*Modificaremos la mitad de los museos para que cumplan con los filtros*/
    for (let i = 0; i < 10; i++) {
        museumsList[i].city=ciudadFiltro;
        museumsList[i].name=nombreFiltro + " " + i;
        museumsList[i].founded_before=foundedBeforeFiltro - (i + 1);
        await repository.save(museumsList[i]);
    }
    const dataMuseo = await service.findAll(ciudadFiltro, nombreFiltro, foundedBeforeFiltro, pageFiltro, limitFiltro);
    /*Cantidad de museos devueltos debe ser como máximo el límite*/
    expect(dataMuseo.museums.length).toBeLessThanOrEqual(limitFiltro);
    /*Todos los museos retornados deben cumplir con los filtros*/
    for (const museum of dataMuseo.museums) {
        expect(museum.city).toBe(ciudadFiltro);
        expect(museum.name).toContain(nombreFiltro);
        expect(museum.founded_before).toBeLessThan(foundedBeforeFiltro);
    }
    /*La página y el límite deben coincidir con los filtros aplicados*/
    expect(dataMuseo.page).toBe(pageFiltro);
    expect(dataMuseo.limit).toBe(limitFiltro);
    /*Verificamos que los museos retornados correspondan a la página y límite correctos (en nuestro caso de 6 a 10)*/
    const museosEsperados = museumsList.slice(5,10)
    for (let i = 0; i < dataMuseo.museums.length; i++) {
        expect(dataMuseo.museums[i].id).toBe(museosEsperados[i].id);
    }
 });

 it('findOne should return a museum by id', async () => {
   const storedMuseum: MuseumEntity = museumsList[0];
   const museum: MuseumEntity = await service.findOne(storedMuseum.id);
   expect(museum).not.toBeNull();
   expect(museum.name).toEqual(storedMuseum.name)
   expect(museum.description).toEqual(storedMuseum.description)
   expect(museum.address).toEqual(storedMuseum.address)
   expect(museum.city).toEqual(storedMuseum.city)
   expect(museum.image).toEqual(storedMuseum.image)
 });

 it('findOne should throw an exception for an invalid museum', async () => {
   await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The museum with the given id was not found")
 });

 it('create should return a new museum', async () => {
   const museum: MuseumEntity = {
     id: "",
     name: faker.company.name(),
     description: faker.lorem.sentence(),
     address: faker.location.secondaryAddress(),
     city: faker.location.city(),
     image: faker.image.url(),
      founded_before: faker.number.int({ min: 1800, max: 2023}),
     exhibitions: [],
     artworks: []
   }

   const newMuseum: MuseumEntity = await service.create(museum);
   expect(newMuseum).not.toBeNull();

   const storedMuseum: MuseumEntity|null = await repository.findOne({where: {id: newMuseum.id}})
   expect(storedMuseum).not.toBeNull();
   expect(storedMuseum!.name).toEqual(newMuseum.name)
   expect(storedMuseum!.description).toEqual(newMuseum.description)
   expect(storedMuseum!.address).toEqual(newMuseum.address)
   expect(storedMuseum!.city).toEqual(newMuseum.city)
   expect(storedMuseum!.image).toEqual(newMuseum.image)
 });
 it('update should modify a museum', async () => {
   const museum: MuseumEntity = museumsList[0];
   museum.name = "New name";
   museum.address = "New address";
    const updatedMuseum: MuseumEntity = await service.update(museum.id, museum);
   expect(updatedMuseum).not.toBeNull();
    const storedMuseum: MuseumEntity|null = await repository.findOne({ where: { id: museum.id } })
   expect(storedMuseum).not.toBeNull();
   expect(storedMuseum!.name).toEqual(museum.name)
   expect(storedMuseum!.address).toEqual(museum.address)
 });

 it('update should throw an exception for an invalid museum', async () => {
   let museum: MuseumEntity = museumsList[0];
   museum = {
     ...museum, name: "New name", address: "New address"
   }
   await expect(() => service.update("0", museum)).rejects.toHaveProperty("message", "The museum with the given id was not found")
 });

 it('delete should remove a museum', async () => {
   const museum: MuseumEntity = museumsList[0];
   await service.delete(museum.id);
    const deletedMuseum: MuseumEntity|null = await repository.findOne({ where: { id: museum.id } })
   expect(deletedMuseum).toBeNull();
 });

 it('delete should remove a museum', async () => {
   const museum: MuseumEntity = museumsList[0];
   await service.delete(museum.id);
    const deletedMuseum: MuseumEntity|null = await repository.findOne({ where: { id: museum.id } })
   expect(deletedMuseum).toBeNull();
 });

 it('delete should throw an exception for an invalid museum', async () => {
   await expect(() => service.delete("0")).rejects.toHaveProperty("message", "The museum with the given id was not found")
 });
});
