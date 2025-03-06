"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCartStore from "@/hooks/use-cart-store";
import { OrderItem } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function AddToCart({
  item,
  minimal = false, // ✅ Yeh sahi tarika hai optional prop ko handle karne ka
}: {
  item: OrderItem;
  minimal?: boolean;
}) {
  const router = useRouter();
  const { addItem } = useCartStore();

  const [quantity, setQuantity] = useState(1);

  return minimal ? (
    <Button
      className="rounded-full w-auto"
      onClick={() => {
        try {
          addItem(item, 1);
          toast.success("Added to Cart", {
            action: (
              <Button onClick={() => router.push("/cart")}>Go to Cart</Button>
            ),
          });
        } catch (error) {
          if (error instanceof Error) {
            toast.error(error.message, {
              style: {
                backgroundColor: "#DC2626", // Red background
                color: "#fff", // White text
              },
            });
          } else {
            toast.error("Something went wrong", {
              style: {
                backgroundColor: "#DC2626", // Red background
                color: "#fff", // White text
              },
            });
          }
        }
      }}
    >
      Add to Cart
    </Button>
  ) : (
    <div className="w-full space-y-2">
      <Select
        value={quantity.toString()}
        onValueChange={(i) => setQuantity(Number(i))}
      >
        <SelectTrigger className="">
          <SelectValue>Quantity: {quantity}</SelectValue>
        </SelectTrigger>
        <SelectContent position="popper">
          {Array.from({ length: item.countInStock }).map((_, i) => (
            <SelectItem key={i + 1} value={`${i + 1}`}>
              {i + 1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        className="rounded-full w-full"
        type="button"
        onClick={async () => {
          try {
            const itemId = await addItem(item, quantity);
            router.push(`/cart/${itemId}`);
          } catch (error) {
            if (error instanceof Error) {
              toast.error(error.message, {
                style: {
                  backgroundColor: "#DC2626", // Red background
                  color: "#fff", // White text
                },
              });
            } else {
              toast.error("Something went wrong", {
                style: {
                  backgroundColor: "#DC2626", // Red background
                  color: "#fff", // White text
                },
              });
            }
          }
        }}
      >
        Add to Cart
      </Button>

      <Button
        variant="secondary"
        onClick={() => {
          try {
            addItem(item, quantity);
            router.push(`/checkout`);
          } catch (error) {
            if (error instanceof Error) {
              toast.error(error.message, {
                style: {
                  backgroundColor: "#DC2626", // Red background
                  color: "#fff", // White text
                },
              });
            } else {
              toast.error("Something went wrong", {
                style: {
                  backgroundColor: "#DC2626", // Red background
                  color: "#fff", // White text
                },
              });
            }
          }
        }}
        className="w-full rounded-full"
      >
        Buy Now
      </Button>
    </div>
  );
}
