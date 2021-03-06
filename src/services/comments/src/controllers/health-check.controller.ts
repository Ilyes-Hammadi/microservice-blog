import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { connect, connection } from 'mongoose';

@Controller()
export default class HealthCheckController {
  @Get('/liveness')
  liveness() {
    return;
  }
  @Get('/readiness')
  async readiness() {
    const exception = new HttpException(
      'required resource not available',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    try {
      // check connection to mongodb
      await connect(
        `${process.env.MONGODB_URL}/test`,
        { useNewUrlParser: true },
      );
      connection.close();
    } catch (error) {
      throw exception;
    }
  }
}
