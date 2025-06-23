
// 📦 Product dat vanuit frontend binnenkomt
export interface ProductInput {
    name: string;
    price: number;
    imageUrl?: string;
  }

export interface Product { 
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}


  
  // 🧾 Eén item in een bestelling
  export interface ProductProductInput {
    productId: number;
    quantity: number;
  }
  
  // 🧾 Bestelling plaatsen
  export interface CreateProductInput {
    userId: string; // Supabase UUID
    items: ProductProductInput[];
  }
  
  // 📤 Antwoordstructuur voor frontend
  export interface ProductResponse {
    id: number;
    createdAt: string;
    totalPrice: number;
    items: {
      productId: number;
      name: string;
      quantity: number;
      priceAtTime: number;
    }[];
  }



