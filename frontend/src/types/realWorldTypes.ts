export interface RealWorldTypes {
  articles: Article[];
  articlesCount: number;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Author;
}

export interface Author {
  username: string;
  bio: null;
  image: string;
  following: boolean;
}

export interface ArticlesResponse {
  articles: Article[];
  articlesCount: number;
}

export interface Tags {
  tags: string[] | null;
}

export interface User {
  user: {
    email: string;
    token: string;
    username: string;
    bio: string;
    image: string;
  };
}

export interface SigninReqest {
  email: string;
  password: string;
}
