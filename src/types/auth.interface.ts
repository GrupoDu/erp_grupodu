export interface IUserLogin {
  email: string;
  password: string;
  user_type: string;
}

export interface ILoginResponse {
  user: { user_id: string; user_type: string };
  accessToken: string;
  refreshToken: string;
}
