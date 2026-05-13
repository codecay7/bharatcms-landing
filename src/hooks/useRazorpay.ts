"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export function useRazorpay() {
  const { user } = useUser();
  const router = useRouter();

  const loadScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (document.getElementById("razorpay-script")) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const openCheckout = async ({
    amount,
    planName,
    userEmail,
    userName,
    tenantId,
    onSuccess,
    onFailure,
  }: {
    amount: number;
    planName: string;
    userEmail: string;
    userName: string;
    tenantId?: number | null;
    onSuccess: (paymentId: string, plan: string) => void;
    onFailure: (error: string) => void;
  }) => {
    const loaded = await loadScript();
    if (!loaded) {
      onFailure("Failed to load Razorpay");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/razorpay/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, plan: planName.toLowerCase() }),
        }
      );
      const data = await res.json();
      const orderId = data.order_id || data.id;

      if (!orderId) {
        onFailure("Failed to create order");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "BharatCMS",
        description: `${planName} Plan`,
        order_id: orderId,
        prefill: {
          name: userName,
          email: userEmail,
          contact: "9999999999",
        },
        theme: { color: "#00d4ff" },
        handler: async (response: any) => {
          try {
            const verifyRes = await fetch(
              `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/razorpay/verify-payment`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  tenantId: tenantId,
                }),
              }
            );

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              // ✅ Update Clerk publicMetadata so plan survives refresh
              await user?.update({
                  unsafeMetadata: {
                    plan: planName.toLowerCase(),
                    planUpdatedAt: new Date().toISOString(),
                    tenantId: tenantId,
                  },
                });

              // ✅ Reload session so Clerk picks up new metadata immediately
              await user?.reload();

              onSuccess(response.razorpay_payment_id, planName.toLowerCase());

              // ✅ Soft refresh so server components re-render with new plan
              router.refresh();
            } else {
              onFailure(verifyData.message || "Verification failed");
            }
          } catch (err) {
            onFailure("Verification request failed");
          }
        },
        modal: {
          ondismiss: () => onFailure("Payment cancelled"),
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      onFailure("An error occurred during checkout initialization");
    }
  };

  return { openCheckout };
}
