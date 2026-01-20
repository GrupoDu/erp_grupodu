interface IUser {
  user_id: string;
  name: string;
  email: string;
  password: string;
  user_type: string;
}

export interface IUserUpdate extends Partial<IUser> {
  user_id: string;
}

export interface IUserCreate extends Omit<IUser, "user_id"> {}

export interface IUserResponse extends Omit<IUser, "password"> {}

export interface IUserLogin extends Pick<IUser, "email" | "password"> {}
