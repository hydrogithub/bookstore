export interface Book {
  id?: string;
  all_time_quantity_sold?: number;
  description?: string;
  discount: number;
  discount_rate: number;
  name: string;
  original_price: number;
  price: number;
  thumbnail_url?: string;
}

export interface InititalBook {
  id?: string;
  all_time_quantity_sold?: number;
  description?: string;
  discount: number;
  discount_rate: string;
  name: string;
  original_price: string;
  price: number;
  thumbnail_url?: string;
}
