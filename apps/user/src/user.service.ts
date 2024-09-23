import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role, ROLE_TYPE, User, UserPrincipal } from "@app/shared";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, 
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>, 
  ) {}

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async registerUser(user: UserPrincipal): Promise<User> {
    const { username, email, roles, id } = user;

    const userRoles = await Promise.all(
      roles.map(async (roleName: ROLE_TYPE) => {
        let role = await this.roleRepository.findOne({
          where: { name: roleName },
        });
        if (!role) {
          role = this.roleRepository.create({ name: roleName });
          role.users = [];
        }
        return role;
      })
    );

    const newUser = this.userRepository.create({
      id,
      username,
      email,
      roles: userRoles,
    });

    const savedUser = await this.userRepository.save(newUser);

    for (const role of userRoles) {
      role.users.push(savedUser);
      await this.roleRepository.save(role);
    }

    return savedUser;
  }
}
