interface IUser {
  user_id: string;
  name: string;
  email: string;
  password: string;
  user_type: string;
}

export interface IUserUpdate extends Partial<Omit<IUser, "user_id">> {}

export interface IUserCreate extends Omit<IUser, "user_id"> {}

export interface IUserLogin extends Pick<IUser, "email" | "password"> {}

export interface IUserPublic extends Omit<IUser, "password"> {}

export interface IUserWithPassword extends IUser {
  password: string;
}
