import { Controller, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth.guard';

@Controller('api/v1/delivery')
export class AppController {

  @UseGuards(AuthGuard)
  @Post()
  create(): string {
    return 'Delivery has been placed.';
  }
}
