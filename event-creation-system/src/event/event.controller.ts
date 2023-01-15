import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { EventDto } from './event.dto';
import { EventService } from './event.service';

@Controller('Event')
export class EventController {
  constructor(private EventService: EventService) { }

  @Get()
  async getAllEventsByLocation(@Query('location') location: string) {
    return await this.EventService.findAllEventsByLocation(location);
  }

  @Get(':eventID')
  async getEvent(@Param('eventID') eventID: number) {
    return await this.EventService.findOneEvent(eventID);
  }

  @Post()
  async addEvent(@Body() Event: EventDto) {
    return await this.EventService.createOneEvent(Event);
  }

  @Delete()
  async deleteEvent(@Query('eventID') eventID: number) {
    return await this.EventService.deleteOneEvent(eventID);
  }
}