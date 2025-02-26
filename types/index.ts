import {
  CartSchema,
  OrderItemSchema,
  ProductInputSchema,
} from "@/lib/validator";
import { z } from "zod";

export type IProductInput = z.infer<typeof ProductInputSchema>;

export type Data = {
  products: IProductInput[];
  headersMenus: {
    name: string;
    href: string;
  }[];

  carousels: {
    image: string;
    url: string;
    title: string;
    buttonCaption: string;
    isPublished: Boolean;
  }[];
};

export type OrderItem = z.infer<typeof OrderItemSchema>;
export type Cart = z.infer<typeof CartSchema>;
