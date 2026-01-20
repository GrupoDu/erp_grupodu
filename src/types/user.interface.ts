export interface IUser {
  name: string;
  email: string;
  password: string;
  user_type: string;
}

export interface IUserResponse extends IUser {
  user_id: string;
}
