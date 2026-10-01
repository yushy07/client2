import React from "react";
import { Link } from "wouter";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Trash2, MessageCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export const EnquiryDrawer: React.FC = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    customer,
    setCustomer,
    clearCustomerDetails,
    customerError,
    setCustomerError,
    generateWhatsAppCartUrl,
    handleSendWhatsAppEnquiry,
  } = useCart();

  return (
    <DialogPrimitive.Root open={isCartOpen} onOpenChange={setIsCartOpen}>
      {/* AnimatePresence must wrap the conditional child, otherwise the exit
          spring never runs and the drawer snaps shut instead of sliding out. */}
      <AnimatePresence>
        {isCartOpen && (
          <DialogPrimitive.Portal key="enquiry-drawer">
          <DialogPrimitive.Overlay className="enquiry-drawer-overlay" />
          <DialogPrimitive.Content asChild aria-describedby={undefined}>
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="enquiry-drawer"
              onClick={(e) => e.stopPropagation()}
              aria-label="Enquiry Drawer"
            >
              <div className="enquiry-drawer-header">
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <ShoppingBag size={20} />
                  <DialogPrimitive.Title asChild>
                    <h3>Enquiry Cart ({cartItems.length})</h3>
                  </DialogPrimitive.Title>
                </div>
                <button
                  type="button"
                  className="enquiry-drawer-close"
                  onClick={() => setIsCartOpen(false)}
                  aria-label="Close Enquiry Drawer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="enquiry-drawer-body">
                {cartItems.length === 0 ? (
                  <div className="enquiry-cart-empty">
                    <ShoppingBag size={44} style={{ margin: "0 auto 16px", opacity: 0.35, color: "var(--moss)" }} />
                    <h4 style={{ fontFamily: "var(--serif)", fontSize: "20px", color: "var(--text-primary)", marginBottom: "8px" }}>
                      Your enquiry cart is empty
                    </h4>
                    <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5, maxWidth: "340px", margin: "0 auto 20px" }}>
                      Add Birla Opus shades from the Explorer, products from the catalogue, or finishes from Surface Studio.
                    </p>
                    <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
                      <Link
                        href="/colour-finder"
                        className="button-primary"
                        onClick={() => setIsCartOpen(false)}
                        style={{ fontSize: "11px", padding: "8px 14px" }}
                      >
                        Browse Shades
                      </Link>
                      <Link
                        href="/paint-products"
                        className="button-ghost"
                        onClick={() => setIsCartOpen(false)}
                        style={{ fontSize: "11px", padding: "8px 14px" }}
                      >
                        Browse Products
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="enquiry-cart-items">
                    <AnimatePresence initial={false}>
                      {cartItems.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, height: 0, scale: 0.95 }}
                          animate={{ opacity: 1, height: "auto", scale: 1 }}
                          exit={{ opacity: 0, height: 0, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="enquiry-cart-item"
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1, minWidth: 0 }}>
                            {item.colourHex ? (
                              <span
                                style={{
                                  width: "28px",
                                  height: "28px",
                                  borderRadius: "5px",
                                  background: item.colourHex,
                                  display: "inline-block",
                                  flexShrink: 0,
                                  border: "1px solid rgba(0,0,0,0.12)",
                                  boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                                }}
                              />
                            ) : (
                              <span className="enquiry-item-type-badge">
                                {item.type === "product" ? "Product" : item.type === "texture" ? "Finish" : "Estimate"}
                              </span>
                            )}
                            <div style={{ minWidth: 0 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                <span className="enquiry-item-tag">{item.type}</span>
                                <div className="enquiry-cart-item-title">{item.title}</div>
                              </div>
                              <div className="enquiry-cart-item-meta">{item.meta}</div>
                              {item.notes && (
                                <div style={{ fontSize: "11px", color: "var(--moss)", marginTop: "2px" }}>
                                  {item.notes}
                                </div>
                              )}
                            </div>
                          </div>

                          {item.type === "product" && (
                            <div
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                margin: "0 10px",
                                background: "var(--surface-paper)",
                                border: "1px solid var(--line)",
                                borderRadius: "4px",
                                padding: "2px 6px",
                              }}
                            >
                              <button
                                type="button"
                                onClick={() => updateCartQuantity(item.id, -1)}
                                style={{
                                  background: "none",
                                  border: 0,
                                  cursor: "pointer",
                                  fontWeight: 700,
                                  fontSize: "14px",
                                  color: "var(--text-secondary)",
                                  padding: "0 4px",
                                }}
                                aria-label={`Decrease quantity of ${item.title}`}
                              >
                                –
                              </button>
                              <span style={{ fontSize: "12px", fontFamily: "var(--mono)", minWidth: "16px", textAlign: "center" }}>
                                {item.quantity ?? 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateCartQuantity(item.id, 1)}
                                style={{
                                  background: "none",
                                  border: 0,
                                  cursor: "pointer",
                                  fontWeight: 700,
                                  fontSize: "14px",
                                  color: "var(--text-secondary)",
                                  padding: "0 4px",
                                }}
                                aria-label={`Increase quantity of ${item.title}`}
                              >
                                +
                              </button>
                            </div>
                          )}

                          <button
                            type="button"
                            className="enquiry-cart-item-remove"
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Remove ${item.title}`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Customer Information Panel */}
                    <div style={{ marginTop: "18px", padding: "16px", background: "var(--surface-soft)", border: "1px solid var(--line)", borderRadius: "6px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          justifyContent: "space-between",
                          gap: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "11px",
                            fontFamily: "var(--mono)",
                            color: "var(--moss)",
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                            fontWeight: 700,
                          }}
                        >
                          Customer Details (Required for Enquiry)
                        </span>
                        <button
                          type="button"
                          onClick={clearCustomerDetails}
                          style={{
                            background: "none",
                            border: 0,
                            padding: 0,
                            cursor: "pointer",
                            fontSize: "11px",
                            fontFamily: "var(--mono)",
                            color: "var(--text-muted)",
                            textDecoration: "underline",
                          }}
                        >
                          Clear my details
                        </button>
                      </div>
                      {customerError && (
                        <div
                          style={{
                            background: "#FEE2E2",
                            color: "#DC2626",
                            padding: "8px 12px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            marginBottom: "10px",
                            lineHeight: 1.4,
                          }}
                        >
                          {customerError}
                        </div>
                      )}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "8px" }}>
                        <input
                          type="text"
                          placeholder="Your name *"
                          value={customer.name}
                          onChange={(e) => {
                            setCustomer({ ...customer, name: e.target.value });
                            if (customerError) setCustomerError("");
                          }}
                          style={{
                            background: "#ffffff",
                            border: "1px solid var(--line)",
                            padding: "8px 10px",
                            fontSize: "12px",
                            borderRadius: "4px",
                            outline: "none",
                            width: "100%",
                          }}
                          aria-label="Your name"
                          required
                        />
                        <input
                          type="tel"
                          placeholder="Phone number *"
                          value={customer.phone}
                          onChange={(e) => {
                            setCustomer({ ...customer, phone: e.target.value });
                            if (customerError) setCustomerError("");
                          }}
                          style={{
                            background: "#ffffff",
                            border: "1px solid var(--line)",
                            padding: "8px 10px",
                            fontSize: "12px",
                            borderRadius: "4px",
                            outline: "none",
                            width: "100%",
                          }}
                          aria-label="Phone number"
                          required
                        />
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.8fr", gap: "8px" }}>
                        <input
                          type="text"
                          placeholder="Area / Locality (e.g. Baskhari) *"
                          value={customer.areaLocation}
                          onChange={(e) => {
                            setCustomer({ ...customer, areaLocation: e.target.value });
                            if (customerError) setCustomerError("");
                          }}
                          style={{
                            background: "#ffffff",
                            border: "1px solid var(--line)",
                            padding: "8px 10px",
                            fontSize: "12px",
                            borderRadius: "4px",
                            outline: "none",
                            width: "100%",
                          }}
                          aria-label="Area or locality"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Pincode *"
                          maxLength={6}
                          value={customer.pincode}
                          onChange={(e) => {
                            setCustomer({ ...customer, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) });
                            if (customerError) setCustomerError("");
                          }}
                          style={{
                            background: "#ffffff",
                            border: "1px solid var(--line)",
                            padding: "8px 10px",
                            fontSize: "12px",
                            borderRadius: "4px",
                            outline: "none",
                            width: "100%",
                          }}
                          aria-label="Pincode"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="enquiry-drawer-footer">
                <a
                  href={
                    cartItems.length > 0 &&
                    customer.name.trim() &&
                    customer.phone.trim() &&
                    customer.areaLocation.trim() &&
                    /^\d{6}$/.test(customer.pincode.trim())
                      ? generateWhatsAppCartUrl()
                      : "#"
                  }
                  onClick={handleSendWhatsAppEnquiry}
                  target={
                    cartItems.length > 0 &&
                    customer.name.trim() &&
                    customer.phone.trim() &&
                    customer.areaLocation.trim() &&
                    /^\d{6}$/.test(customer.pincode.trim())
                      ? "_blank"
                      : undefined
                  }
                  rel="noopener noreferrer"
                  className="button-primary !bg-emerald-600 hover:!bg-emerald-700 shadow-lg shadow-emerald-950/20"
                  style={{ width: "100%", textAlign: "center", justifyContent: "center", display: "inline-flex", gap: "8px" }}
                >
                  <MessageCircle size={16} />
                  Send Enquiry on WhatsApp
                </a>
                <p style={{ fontSize: "11px", textAlign: "center", color: "var(--text-muted)", marginTop: "10px" }}>
                  Directly connects with Jaymurti Traders (+91 8756659035) with formatted specifications.
                </p>
              </div>
            </motion.aside>
          </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
};
