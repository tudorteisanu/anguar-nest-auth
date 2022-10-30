import { UserInterface } from './user';

export interface TokensInterface {
  accessToken: string;
  refreshToken: string;
}

export interface CredentialsInterface extends TokensInterface {
  user: UserInterface;
}

export interface LoginInterface {
  email: string;
  password: string;
}
