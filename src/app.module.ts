import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Schemas
import { User, UserSchema } from './schemas/user.schema';
import { Product, ProductSchema } from './schemas/product.schema';
import { Order, OrderSchema } from './schemas/order.schema';
import { Role, RoleSchema } from './schemas/role.schema';
import { Profile, ProfileSchema } from './schemas/profile.schema';

// Services
import { UsersService } from './users/users.service';
import { ProductsService } from './products/products.service';
import { AuthService } from './auth/auth.service';
import { RolesService } from './roles/roles.service';
import { ProfilesService } from './profiles/profiles.service';
import { OrdersService } from './orders/orders.service';

// Controllers
import { UsersController } from './users/users.controller';
import { ProductsController } from './products/products.controller';
import { AuthController } from './auth/auth.controller';
import { RolesController } from './roles/roles.controller';
import { ProfilesController } from './profiles/profiles.controller';
import { OrdersController } from './orders/orders.controller';

// Auth
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/seiko-app'),    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Product.name, schema: ProductSchema },
      { name: Order.name, schema: OrderSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Profile.name, schema: ProfileSchema },
    ]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '24h' },
    }),
  ],  controllers: [
    AppController, 
    UsersController, 
    ProductsController, 
    AuthController,
    RolesController,
    ProfilesController,
    OrdersController
  ],
  providers: [
    AppService, 
    UsersService, 
    ProductsService, 
    AuthService, 
    RolesService,
    ProfilesService,
    OrdersService,
    JwtStrategy
  ],
})
export class AppModule {}
