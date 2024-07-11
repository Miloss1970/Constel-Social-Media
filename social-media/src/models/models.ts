export interface LoginFormInputs {
  email: string;
  password: string;
}

export interface CurrentUser {
  email: string;
  full_name: string;
  picture: string;
  username: string;
}

export interface Post {
  audio: string | null;
  comments: number;
  created_at: string;
  image: string | null;
  liked: boolean;
  likes: number;
  post_id: string;
  text: string;
  user: CurrentUser;
  user_id: string;
}

export interface Comment {
  comment_id: string;
  created_at: string;
  full_name: string;
  picture: string;
  text: string;
  username: string;
}
