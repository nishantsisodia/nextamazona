import {
  UserSignInSchema,
  UserInputSchema,
  CartSchema,
  OrderItemSchema,
  UserSignUpSchema,
  ProductInputSchema,
  ShippingAddressSchema,
  OrderInputSchema,
  ReviewInputSchema,
  UserNameSchema,
} from "@/lib/validator";
import { z } from "zod";

export type IReviewInput = z.infer<typeof ReviewInputSchema>
export type IReviewDetails = IReviewInput & {
  _id: string
  createdAt: string
  user: {
    name: string
  }
}


//Order:

export type IProductInput = z.infer<typeof ProductInputSchema>;

export type IOrderList = IOrderInput & {
  _id: string
  user: {
    name: string
    email: string
  }
  createdAt: Date
}
export type Data = {
  users: IUserInput[]
  products: IProductInput[];
  headersMenus: {
    name: string;
    href: string;
  }[];

  reviews: {
    title: string
    rating: number
    comment: string
  }[]

  carousels: {
    image: string;
    url: string;
    title: string;
    buttonCaption: string;
    isPublished: boolean;
  }[];
};

export type OrderItem = z.infer<typeof OrderItemSchema>;
export type Cart = z.infer<typeof CartSchema>;
export type ShippingAddress = z.infer<typeof ShippingAddressSchema>
export type IOrderInput = z.infer<typeof OrderInputSchema>




// user
export type IUserInput = z.infer<typeof UserInputSchema>
export type IUserSignIn = z.infer<typeof UserSignInSchema>
export type IUserSignUp = z.infer<typeof UserSignUpSchema>
export type IUserName = z.infer<typeof UserNameSchema>
