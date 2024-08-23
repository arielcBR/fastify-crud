export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserCreate = Pick<User, "name" | "email" >;

export interface UserRepository {
  create(data: UserCreate): Promise<User>
  findByEmail(email: string): Promise<User | null>
}