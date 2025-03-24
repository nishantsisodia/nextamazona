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
  WebPageInputSchema,
  CarouselSchema,
  SettingInputSchema,
  SiteLanguageSchema,
  SiteCurrencySchema,
  PaymentMethodSchema,
  DeliveryDateSchema,
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
  webPages: IWebPageInput[];
  settings: ISettingInput[]
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

// webpage
export type IWebPageInput = z.infer<typeof WebPageInputSchema>


// setting
export type ICarousel = z.infer<typeof CarouselSchema>
export type ISettingInput = z.infer<typeof SettingInputSchema>
export type ClientSetting = ISettingInput & {
  currency: string
}
export type SiteLanguage = z.infer<typeof SiteLanguageSchema>
export type SiteCurrency = z.infer<typeof SiteCurrencySchema>
export type PaymentMethod = z.infer<typeof PaymentMethodSchema>
export type DeliveryDate = z.infer<typeof DeliveryDateSchema>