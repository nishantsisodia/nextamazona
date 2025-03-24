import { HelpCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-4">
      <header className="bg-card mb-4 border-b">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/">
          <div className="h-20 overflow-hidden  flex items-center">

            <Image
              src="/icons/logo1.gif"
              alt="logo"
              width={200}
              height={0}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
              />
              </div>
          </Link>
          <div>
            <h1 className="text-3xl">Checkout</h1>
          </div>
          <div>
            <Link href="/page/help">
              <HelpCircle className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
