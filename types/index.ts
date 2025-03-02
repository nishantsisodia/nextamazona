import {
  UserSignInSchema,
  UserInputSchema,
  CartSchema,
  OrderItemSchema,
  ProductInputSchema,
} from "@/lib/validator";
import { z } from "zod";

export type IProductInput = z.infer<typeof ProductInputSchema>;

export type Data = {
  users: IUserInput[]
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




// user
export type IUserInput = z.infer<typeof UserInputSchema>
export type IUserSignIn = z.infer<typeof UserSignInSchema>
