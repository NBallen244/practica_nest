/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
/*Servicio para ejecutar el script SQL que llena la tabla de museos al iniciar la aplicación*/
@Injectable()
export class SeedService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async runSqlSeed() {
    const sqlPath = path.join('src', 'sql', 'museos.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    await this.dataSource.query(sql);
    console.log('✅ Script SQL ejecutado correctamente');
  }
}

