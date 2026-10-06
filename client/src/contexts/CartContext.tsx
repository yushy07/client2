import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { isValidPhone, PHONE_ERROR_MESSAGE } from "@shared/validation";

export interface CartItem {
  id: string;
  type: "product" | "shade" | "texture" | "estimate";
  title: string;
  meta: string;
  colourHex?: string;
  imageUrl?: string;
  quantity?: number;
  finish?: string;
  packSize?: string;
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
  clearCustomerDetails: () => void;
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

const EMPTY_CUSTOMER: CustomerInfo = {
  name: "",
  phone: "",
  areaLocation: "",
  pincode: "224129",
};

function clearStoredCustomer() {
  try {
    localStorage.removeItem(CUSTOMER_STORAGE_KEY);
  } catch {
    // Storage unavailable (private mode, quota); nothing to clear.
  }
}

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [customer, setCustomer] = useState<CustomerInfo>({ ...EMPTY_CUSTOMER });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customerError, setCustomerError] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [toastData, setToastData] = useState<{ title: string; desc: string }>({ title: "", desc: "" });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Storage unavailable; the cart still works for this session.
    }
  }, [cartItems]);

  // Remove contact details saved by older versions. New details stay in memory
  // only and are included in WhatsApp only after the customer chooses to send.
  useEffect(() => clearStoredCustomer(), []);

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
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, (item.quantity ?? 1) + delta) }
            : item,
        )
        // Stepping a quantity below one removes the line. Clamping at one here
        // previously made this filter unreachable dead code.
        .filter((item) => (item.quantity ?? 1) > 0),
    );
  }, []);

  const clearCustomerDetails = useCallback(() => {
    setCustomer({ ...EMPTY_CUSTOMER });
    setCustomerError("");
    clearStoredCustomer();
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const generateWhatsAppCartUrl = useCallback(() => {
    const cleanName = customer.name.trim();
    const cleanPhone = customer.phone.trim();
    const cleanLocation = customer.areaLocation.trim();
    const cleanPincode = customer.pincode.trim();

    // If cart is empty and no customer details entered, return a clean direct message
    if (cartItems.length === 0 && !cleanName && !cleanPhone) {
      const defaultMsg =
        "Hello Jaymurti Traders, I would like to enquire about Birla Opus paints, shade catalogues, and product consultation.";
      return `https://wa.me/918756659035?text=${encodeURIComponent(defaultMsg)}`;
    }

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
          const lines: string[] = [
            `*${itemNum}. PRODUCT*`,
            `*Product:* ${item.title}`,
          ];
          if (item.meta && item.meta.includes("·")) {
            const parts = item.meta.split("·").map((p) => p.trim());
            if (parts[0]) lines.push(`*Category:* ${parts[0]}`);
            if (parts[1]) lines.push(`*Family:* ${parts[1]}`);
          } else if (item.meta) {
            lines.push(`*Details:* ${item.meta}`);
          }
          if (item.finish && item.finish.trim() && !/^(standard|undefined|null|n\/a)$/i.test(item.finish.trim())) {
            lines.push(`*Finish:* ${item.finish.trim()}`);
          }
          if (item.packSize && item.packSize.trim()) {
            lines.push(`*Pack Size:* ${item.packSize.trim()}`);
          }
          if (item.notes && item.notes.trim()) {
            lines.push(`*Notes:* ${item.notes.trim()}`);
          }
          lines.push(`*Quantity:* ${item.quantity ?? 1}`);
          itemsFormatted.push(lines.join("\n"));
        } else if (item.type === "shade") {
          const codeMatch = item.meta.match(/Code:\s*([^·]+)/i);
          const familyMatch = item.meta.match(/Family:\s*(.+)/i);
          const shadeCode = codeMatch?.[1]?.trim() ?? "";
          const shadeFamily = familyMatch?.[1]?.trim() ?? "";
          const lines: string[] = [
            `*${itemNum}. SHADE*`,
            `*Shade:* ${item.title}`,
          ];
          if (shadeCode) lines.push(`*Code:* ${shadeCode}`);
          if (shadeFamily) lines.push(`*Family:* ${shadeFamily}`);
          if (item.finish && item.finish.trim() && !/^(standard|undefined|null|n\/a)$/i.test(item.finish.trim())) {
            lines.push(`*Finish:* ${item.finish.trim()}`);
          }
          if (item.notes && item.notes.trim()) {
            lines.push(`*Notes:* ${item.notes.trim()}`);
          }
          itemsFormatted.push(lines.join("\n"));
        } else if (item.type === "texture") {
          const lines: string[] = [
            `*${itemNum}. FINISH / TEXTURE*`,
            `*Finish:* ${item.title}`,
          ];
          if (item.meta && item.meta.trim()) lines.push(`*Series:* ${item.meta.trim()}`);
          if (item.finish && item.finish.trim() && !/^(standard|undefined|null|n\/a)$/i.test(item.finish.trim())) {
            lines.push(`*Finish Option:* ${item.finish.trim()}`);
          }
          if (item.notes && item.notes.trim()) lines.push(`*Notes:* ${item.notes.trim()}`);
          itemsFormatted.push(lines.join("\n"));
        } else {
          const lines: string[] = [
            `*${itemNum}. ITEM*`,
            `*Name:* ${item.title}`,
          ];
          if (item.meta && item.meta.trim()) lines.push(`*Details:* ${item.meta.trim()}`);
          if (item.finish && item.finish.trim() && !/^(standard|undefined|null|n\/a)$/i.test(item.finish.trim())) {
            lines.push(`*Finish:* ${item.finish.trim()}`);
          }
          if (item.notes && item.notes.trim()) lines.push(`*Notes:* ${item.notes.trim()}`);
          itemsFormatted.push(lines.join("\n"));
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
        if (paintMatch?.[1]) estLines.push(`*Paint:* ${paintMatch[1].trim()}`);
        if (primerMatch?.[1]) estLines.push(`*Primer:* ${primerMatch[1].trim()}`);
        if (puttyMatch?.[1]) estLines.push(`*Putty:* ${puttyMatch[1].trim()}`);
        if (priceMatch?.[1]) {
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
    if (!isValidPhone(customer.phone)) {
      e.preventDefault();
      setCustomerError(PHONE_ERROR_MESSAGE);
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
    e.preventDefault();
    const url = generateWhatsAppCartUrl();
    const isMobile = typeof navigator !== "undefined" && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = url;
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }, [cartItems, customer, generateWhatsAppCartUrl]);

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
        clearCustomerDetails,
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
