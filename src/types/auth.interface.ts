export interface IUserLogin {
  email: string;
  password: string;
  user_type: string;
}

export interface ILoginResponse {
  user: { user_uuid: string; user_type: string };
  accessToken: string;
  refreshToken: string;
}
