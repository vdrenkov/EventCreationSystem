import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Event } from './event.entity';
import { Repository } from 'typeorm';
import { EventDto } from './event.dto';

@Injectable()
export class EventService {
  constructor(
    @Inject('EVENT_REPOSITORY')
    private EventRepository: Repository<Event>,
  ) {}

  public async findAllEventsByLocation(location:string): Promise<Event[]> {
    return this.EventRepository.find({
      where: { location },
    });
  }

  public async findOneEvent(id: number) {
    const Event = await this.EventRepository.findOne({
      where: { id: id },
    });
    if (!Event) {
      throw new NotFoundException(`Event with id ${id} was not found.`);
    }
    return Event;
  }

  public async createOneEvent(Event: EventDto): Promise<Event> {
    let createdEvent = ((
      await this.EventRepository.insert(Event)
    ).identifiers[0]) as EventDto;
    return createdEvent;
  }

  public async deleteOneEvent(id: number): Promise<any> {
    let persistedEvent = await this.EventRepository.findOne({
      where: { id },
    });
    if (!persistedEvent) {
      throw new NotFoundException(`Event with id ${id} was not found.`);
    }
    persistedEvent = (await this.EventRepository.delete({ id }))?.raw;
    return persistedEvent;
  }
}