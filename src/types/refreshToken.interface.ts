export interface IRefreshToken {
  created_at: Date;
  refresh_token_uuid: string;
  token: string;
  user_uuid: string;
  expires_at: Date;
  is_revoked: boolean;
}
