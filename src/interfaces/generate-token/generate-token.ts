import { HttpResponse } from "../http/http";

export interface IgenerateToken {
  generateToken(): string;
}

export interface IloggedInUser {
  user: {
    id: number;
    user: string;
    email: string;
  };
  token: string;
}
