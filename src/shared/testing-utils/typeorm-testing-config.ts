/* eslint-disable prettier/prettier */
/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from 'src/artist/artist.entity';
import { ArtworkEntity } from 'src/artwork/artwork.entity';
import { ExhibitionEntity } from 'src/exhibition/exhibition.entity';
import { ImageEntity } from 'src/image/image.entity';
import { MovementEntity } from 'src/movement/movement.entity';
import { MuseumEntity } from 'src/museum/museum.entity';
import { SponsorEntity } from 'src/sponsor/sponsor.entity';

export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [ArtistEntity, ArtworkEntity, ExhibitionEntity, ImageEntity, MovementEntity, MuseumEntity, SponsorEntity],
   synchronize: true,
   keepConnectionAlive: true,
 }),
 TypeOrmModule.forFeature([ArtistEntity, ArtworkEntity, ExhibitionEntity, ImageEntity, MovementEntity, MuseumEntity, SponsorEntity]),
];