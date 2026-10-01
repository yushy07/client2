import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export interface CartItem {
  id: string;
  type: "product" | "shade" | "texture" | "estimate";
  title: string;
  meta: string;
  colourHex?: string;
  quantity?: number;
  notes?: string;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  areaLocation: string;
  pincode: string;
}

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (item: CartItem, openDrawer?: boolean) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  customer: CustomerInfo;
  setCustomer: React.Dispatch<React.SetStateAction<CustomerInfo>>;
  customerError: string;
  setCustomerError: (error: string) => void;
  generateWhatsAppCartUrl: () => string;
  handleSendWhatsAppEnquiry: (e: React.MouseEvent) => void;
  toastOpen: boolean;
  setToastOpen: (open: boolean) => void;
  toastData: { title: string; desc: string };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "jaymurti_cart_v1";
const CUSTOMER_STORAGE_KEY = "jaymurti_customer_v1";

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [customer, setCustomer] = useState<CustomerInfo>(() => {
    try {
      const saved = localStorage.getItem(CUSTOMER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : { name: "", phone: "", areaLocation: "", pincode: "224129" };
    } catch {
      return { name: "", phone: "", areaLocation: "", pincode: "224129" };
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customerError, setCustomerError] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [toastData, setToastData] = useState<{ title: string; desc: string }>({ title: "", desc: "" });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customer));
    } catch {}
  }, [customer]);

  const addToCart = useCallback((item: CartItem, openDrawer = false) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: (i.quantity ?? 1) + 1 } : i));
      }
      return [...prev, item];
    });

    setToastData({
      title: item.title,
      desc: `Added to your enquiry list · ${item.meta}`,
    });
    setToastOpen(true);

    if (openDrawer) {
      setIsCartOpen(true);
    }
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateCartQuantity = useCallback((id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = Math.max(1, (item.quantity ?? 1) + delta);
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => (item.quantity ?? 1) > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const generateWhatsAppCartUrl = useCallback(() => {
    const cleanName = customer.name.trim();
    const cleanPhone = customer.phone.trim();
    const cleanLocation = customer.areaLocation.trim();
    const cleanPincode = customer.pincode.trim();

    const divider = `━━━━━━━━━━━━━━━━━━`;
    const sections: string[] = [];

    // Header
    sections.push(`*NEW ENQUIRY — JAYMURTI TRADERS*\n*जयमूर्ति ट्रेडर्स*`);

    // Customer Details
    const customerLines: string[] = [
      `*CUSTOMER DETAILS*`,
      ``,
      `👤 *Name:* ${cleanName || "Not provided"}`,
      `📞 *Phone:* ${cleanPhone || "Not provided"}`,
      `📍 *Area / Locality:* ${cleanLocation || "Not provided"}`,
      `📮 *Pincode:* ${cleanPincode || "224129"}`,
    ];
    sections.push(customerLines.join("\n"));

    // Enquiry Items
    const enquiryItems = cartItems.filter((i) => i.type !== "estimate");
    const estimateItems = cartItems.filter((i) => i.type === "estimate");

    if (enquiryItems.length > 0) {
      const itemsFormatted: string[] = [`*ENQUIRY ITEMS*`];

      enquiryItems.forEach((item, idx) => {
        const itemNum = idx + 1;
        if (item.type === "product") {
          const parts = item.meta.split("·").map((p) => p.trim());
          const category = parts[0] || "";
          const family = parts[1] || "";
          const lines: string[] = [
            `*${itemNum}. PRODUCT*`,
            `*Product:* ${item.title}`,
          ];
          if (category) lines.push(`*Category:* ${category}`);
          if (family) lines.push(`*Family:* ${family}`);
          lines.push(`*Quantity:* ${item.quantity ?? 1}`);
          itemsFormatted.push(lines.join("\n"));
        } else if (item.type === "shade") {
          const codeMatch = item.meta.match(/Code:\s*([^·]+)/i);
          const familyMatch = item.meta.match(/Family:\s*(.+)/i);
          const shadeCode = codeMatch ? codeMatch[1].trim() : "";
          const shadeFamily = familyMatch ? familyMatch[1].trim() : "";
          const lines: string[] = [
            `*${itemNum}. SHADE*`,
            `*Shade:* ${item.title}`,
          ];
          if (shadeCode) lines.push(`*Code:* ${shadeCode}`);
          if (shadeFamily) lines.push(`*Family:* ${shadeFamily}`);
          itemsFormatted.push(lines.join("\n"));
        } else if (item.type === "texture") {
          const lines: string[] = [
            `*${itemNum}. FINISH / TEXTURE*`,
            `*Finish:* ${item.title}`,
          ];
          if (item.meta) lines.push(`*Series:* ${item.meta}`);
          itemsFormatted.push(lines.join("\n"));
        } else {
          itemsFormatted.push(
            `*${itemNum}. ITEM*\n*Name:* ${item.title}\n*Details:* ${item.meta}`
          );
        }
      });

      sections.push(itemsFormatted.join("\n\n"));
    }

    if (estimateItems.length > 0) {
      const estimateFormatted: string[] = [`*PAINT ESTIMATE*`];

      estimateItems.forEach((est) => {
        const cleanTitle = est.title.replace(/^Paint Estimate:\s*/i, "").trim();
        const paintMatch = est.meta.match(/Paint:\s*([^·]+)/i);
        const primerMatch = est.meta.match(/Primer:\s*([^·]+)/i);
        const puttyMatch = est.meta.match(/Putty:\s*([^·]+)/i);
        const priceMatch = (est.notes || "").match(/Estimated material range:\s*(.+)/i);

        const estLines: string[] = [];
        estLines.push(`*Project / Estimate:* ${cleanTitle || est.title}`);
        if (paintMatch) estLines.push(`*Paint:* ${paintMatch[1].trim()}`);
        if (primerMatch) estLines.push(`*Primer:* ${primerMatch[1].trim()}`);
        if (puttyMatch) estLines.push(`*Putty:* ${puttyMatch[1].trim()}`);
        if (priceMatch) {
          estLines.push(`*Estimated Material Range:* ${priceMatch[1].trim()}`);
        } else if (est.notes) {
          estLines.push(`*Notes:* ${est.notes}`);
        }
        estimateFormatted.push(estLines.join("\n"));
      });

      sections.push(estimateFormatted.join("\n\n"));
    }

    // Customer Request
    const requestLines: string[] = [
      `*CUSTOMER REQUEST*`,
      ``,
      `Please confirm:`,
      `• Product availability`,
      `• Shade availability`,
      `• Required quantities`,
      `• Suitable finish/options`,
      `• Pickup / delivery availability`,
      `• Any additional information required`,
    ];
    sections.push(requestLines.join("\n"));
    sections.push(`*Source:* Jaymurti Traders Website Enquiry`);

    const fullText = sections.join(`\n\n${divider}\n\n`);
    return `https://wa.me/918756659035?text=${encodeURIComponent(fullText)}`;
  }, [cartItems, customer]);

  const handleSendWhatsAppEnquiry = useCallback((e: React.MouseEvent) => {
    if (cartItems.length === 0) {
      e.preventDefault();
      setCustomerError("Your enquiry cart is empty. Please add products or shades first.");
      return;
    }
    if (!customer.name.trim()) {
      e.preventDefault();
      setCustomerError("Please enter your name.");
      return;
    }
    if (!/^[0-9+()\-\s]{7,20}$/.test(customer.phone.trim())) {
      e.preventDefault();
      setCustomerError("Please enter a valid phone number (at least 7–10 digits).");
      return;
    }
    if (!/^\d{6}$/.test(customer.pincode.trim())) {
      e.preventDefault();
      setCustomerError("Please enter a valid 6-digit delivery/project pincode.");
      return;
    }
    if (!customer.areaLocation.trim()) {
      e.preventDefault();
      setCustomerError("Please enter your area or locality.");
      return;
    }
    setCustomerError("");
  }, [cartItems, customer]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        customer,
        setCustomer,
        customerError,
        setCustomerError,
        generateWhatsAppCartUrl,
        handleSendWhatsAppEnquiry,
        toastOpen,
        setToastOpen,
        toastData,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
