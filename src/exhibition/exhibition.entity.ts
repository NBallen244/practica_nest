/* eslint-disable prettier/prettier */
/* archivo: src/exhibition/exhibition.entity.ts */
import { MuseumEntity } from '../museum/museum.entity';
import { ArtworkEntity } from '../artwork/artwork.entity';
import { SponsorEntity } from '../sponsor/sponsor.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

@Entity()
export class ExhibitionEntity {
   @PrimaryGeneratedColumn("uuid")
   id: string;
   @Column()
   name: string;
   @Column()
   description: string;
   @ManyToOne(() => MuseumEntity, museum => museum.exhibitions)
   museum: MuseumEntity;
   @OneToMany(() => ArtworkEntity, artwork => artwork.exhibition)
   artworks: ArtworkEntity[];

   @OneToOne(() => SponsorEntity, sponsor => sponsor.exhibition)
   @JoinColumn()
   sponsor: SponsorEntity;
}
