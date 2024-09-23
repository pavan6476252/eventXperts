
# Auth Library Documentation

This library provides authentication and authorization functionality using **Auth0** and **JWT** in a NestJS application. It includes the following key components:
- **JWT Authentication** using Auth0
- **Role-based Authorization** for protecting routes
- **Guards** to enforce authentication and role-based access control

## Features

- **JWT-based authentication** using Auth0.
- **Role-based access control** using custom decorators and guards.
- Easy integration with existing NestJS applications.

## Installation

### 1. Install Dependencies
```bash
npm install @nestjs/passport passport passport-jwt jwks-rsa axios
```

### 2. Environment Variables

Add the following environment variables in your `.env` file for Auth0 configuration:

```
AUTH0_DOMAIN=<your-auth0-domain>
AUTH0_CLIENT_ID=<your-auth0-client-id>
AUTH0_CLIENT_SECRET=<your-auth0-client-secret>
AUTH0_IDENTIFIER=<your-auth0-audience>
```

## Usage

### 1. Import the `AuthModule`

To use the authentication library in your NestJS modules, import the `AuthModule` into any module where you need authentication and role-based access control.

```ts
import { Module } from '@nestjs/common';
import { AuthModule } from '@app/auth';
import { UserController } from './user.controller';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
})
export class UserModule {}
```

### 2. Protect Routes with JWT

Use the `JwtAuthGuard` to protect routes that require authentication. This guard ensures that only authenticated users with a valid JWT can access the route.

```ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@app/auth';

@Controller('users')
export class UserController {
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getUserProfile() {
    return 'This is a protected route for authenticated users';
  }
}
```

### 3. Role-based Authorization

Use the `RoleGuard` along with the `Roles` decorator to restrict access to certain routes based on user roles.

- Define roles in the `ROLE_TYPE` enum.
- Use the `Roles()` decorator to specify required roles for a route.
  
```ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, RoleGuard, Roles } from '@app/auth';
import { ROLE_TYPE } from '@app/auth/constants';

@Controller('admin')
export class AdminController {
  @Get('dashboard')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLE_TYPE.ADMIN)
  getAdminDashboard() {
    return 'This route is restricted to users with the ADMIN role';
  }
}
```

### 4. Assign and Retrieve Roles from Auth0

You can use the `AuthService` to programmatically assign roles to users and retrieve their roles from Auth0.

#### Assign Role
```ts
import { AuthService } from '@app/auth';

@Injectable()
export class UserService {
  constructor(private authService: AuthService) {}

  async assignUserRole(userId: string) {
    const role = 'admin-role-id';
    await this.authService.assignRole(userId, role);
  }
}
```

#### Get User Roles
```ts
import { AuthService } from '@app/auth';

@Injectable()
export class UserService {
  constructor(private authService: AuthService) {}

  async getUserRoles(userId: string) {
    const roles = await this.authService.getUserRoles(userId);
    console.log(roles);
  }
}
```

## Guards and Decorators

### `JwtAuthGuard`
- Use this guard to protect routes with JWT-based authentication.
- It verifies the JWT token and checks if the user is authenticated.

### `RoleGuard`
- Use this guard to enforce role-based access control.
- Requires the `Roles()` decorator to specify which roles are allowed to access a route.

### `Roles` Decorator
- Use this decorator to specify roles required for accessing a route.
- Example: `@Roles(ROLE_TYPE.ADMIN)` to restrict access to users with the `ADMIN` role.

```ts
import { SetMetadata } from '@nestjs/common';
import { ROLE_TYPE } from './constants';

export const Roles = (...roles: ROLE_TYPE[]) => SetMetadata('roles', roles);
```

## Interfaces

### `UserPrincipal`
- Represents the authenticated user object. This interface is used in guards to check user roles.

```ts
export interface UserPrincipal {
  readonly username: string;
  readonly id: string;
  readonly email: string;
  readonly roles: ROLE_TYPE[];
}
```

### `AuthenticatedRequest`
- Extends the `Request` interface to include the `UserPrincipal` object.

```ts
export interface AuthenticatedRequest extends Request {
  readonly user: UserPrincipal;
}
```

## Example Flow

1. **Login**: A user logs in via Auth0, receives a JWT token, and includes it in the `Authorization` header for API requests.
2. **Access Control**: Controllers use `JwtAuthGuard` and `RoleGuard` to restrict access based on authentication and roles.
3. **Roles**: Roles are assigned and verified via the Auth0 Management API using the `AuthService`.


## License

This library is licensed under the MIT License.
 