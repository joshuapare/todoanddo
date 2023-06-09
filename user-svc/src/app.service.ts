import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  handlePing() {
    return 'pong';
  }
}
