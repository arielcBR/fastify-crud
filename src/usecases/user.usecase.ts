import { User, UserCreate, UserRepository } from '../interfaces/users.interface';
import { UserRepositoryPrisma } from '../repositories/user.repository';

class UserUseCase {
  private userRepository : UserRepository;

  constructor() {
    this.userRepository = new UserRepositoryPrisma
  }

  async create({name, email} : UserCreate): Promise<User> {
    const verifyIfUserExists = await this.userRepository.findByEmail(email);
    
    if(!verifyIfUserExists){
      const result = await this.userRepository.create({name, email});
      return result;
    }

    throw new Error('User already exists');

  }

}

export { UserUseCase }