import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// import { Dialect, Sequelize } from 'sequelize';

// const dbName = process.env.DB_NAME;
// const dbUser = process.env.DB_USER;
// const dbHost = process.env.DB_HOST;
// const dbDriver = process.env.DB_DRIVER as Dialect;
// const dbPassword = process.env.DB_PASSWORD;
// console.log('dbname:', dbName);
// const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
//   host: dbHost,
//   dialect: dbDriver,
// });

// sequelizeConnection
//   .authenticate()
//   .then(() => console.log('connect successfully'))
//   .catch((err) => console.log(err));

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder().setTitle('').build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
