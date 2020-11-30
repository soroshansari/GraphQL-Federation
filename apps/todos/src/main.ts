import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { TodosModule } from './todos.module';

async function bootstrap() {
  const app = await NestFactory.create(TodosModule);
  await app.listen(3003);
  const url = await app.getUrl();
  Logger.log(`${url}/graphql`);
}
bootstrap();
