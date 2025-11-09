/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MuseumArtworkService } from './museum-artwork.service';
import { MuseumEntity } from 'src/museum/museum.entity';
import { ArtworkEntity } from 'src/artwork/artwork.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MuseumArtworkController } from './museum-artwork.controller';

@Module({
  imports:[TypeOrmModule.forFeature([MuseumEntity, ArtworkEntity])],
  providers: [MuseumArtworkService],
  controllers: [MuseumArtworkController],
})
export class MuseumArtworkModule {}
