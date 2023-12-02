export interface AccountResponse {
  id: string;
  email: string;
  username: string;
  is_active: boolean;

  access: string;
  refresh: string;
}

export interface HueResponse {
  hex_code: string;
  likes: number[];
  url: string;
  user: number;
  username: string;
  pk: number;
}
