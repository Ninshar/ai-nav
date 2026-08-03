/** 数据层类型定义：分类与应用记录的约束 */

export type CategoryKey =
  | "assistant"
  | "code"
  | "image"
  | "video"
  | "office"
  | "search"
  | "life"
  | "data";

export interface Category {
  key: CategoryKey;
  label: string;
  icon: string;
  color: string;
}

export interface Tool {
  id: string;
  name: string;
  domain: string;
  url: string;
  desc: string;
  category: CategoryKey;
  tags: string[];
  rating: number;
  favs: number;
  pricing: string;
  platforms: string[];
  featured: boolean;
  added: string;
}
