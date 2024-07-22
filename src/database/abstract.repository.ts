import { FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Logger, NotFoundException } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class AbstractRepository<T extends AbstractEntity<T>> {
  protected abstract readonly logger: Logger;
  constructor(private readonly entityRepository: Repository<T>) {}

  async create(entity: T): Promise<T> {
    const user = await this.entityRepository.save(entity);
    return user;
  }

  async findOne(
    where: FindOptionsWhere<T>,
    relations?: FindOptionsRelations<T>,
  ): Promise<T> {
    const entity = await this.entityRepository.findOne({ where, relations });
    if (!entity) {
      this.logger.error('Entity not found with where: ', where);
      throw new NotFoundException('Entity not found');
    }
    return entity;
  }

  async findOneAndUpdate(
    where: FindOptionsWhere<T>,
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<T> {
    const updatedResult = await this.entityRepository.update(
      where,
      partialEntity,
    );
    if (!updatedResult.affected) {
      this.logger.error('Entity not found with where: ', where);
      throw new NotFoundException('Entity not found');
    }
    return await this.findOne(where);
  }

  async find(where: FindOptionsWhere<T>) {
    return await this.entityRepository.findBy(where);
  }

  async findOneAndDelete(where: FindOptionsWhere<T>) {
    await this.entityRepository.delete(where);
  }
}
