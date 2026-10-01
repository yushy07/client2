import React, { useRef } from "react";
import { Link } from "wouter";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Trash2, MessageCircle, User, Package, Sparkles, Layers, AlertCircle, MapPin } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { isValidPhone, PHONE_ERROR_MESSAGE } from "@shared/validation";
import { birlaOpusProducts } from "@shared/birlaOpusCatalogue";

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
  } = useCart();

  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const areaInputRef = useRef<HTMLInputElement>(null);
  const pincodeInputRef = useRef<HTMLInputElement>(null);

  const productMap = React.useMemo(() => {
    const map = new Map<string, string>();
    for (const p of birlaOpusProducts) {
      if (p.slug) map.set(p.slug.toLowerCase(), p.imageUrl);
      if (p.name) map.set(p.name.toLowerCase(), p.imageUrl);
    }
    return map;
  }, []);

  const handleWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (cartItems.length === 0) {
      e.preventDefault();
      setCustomerError("Your enquiry cart is empty. Please add products or shades first.");
      return;
    }
    if (!customer.name.trim()) {
      e.preventDefault();
      setCustomerError("Please enter your name.");
      nameInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      nameInputRef.current?.focus();
      return;
    }
    if (!isValidPhone(customer.phone)) {
      e.preventDefault();
      setCustomerError(PHONE_ERROR_MESSAGE);
      phoneInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      phoneInputRef.current?.focus();
      return;
    }
    if (!customer.areaLocation.trim()) {
      e.preventDefault();
      setCustomerError("Please enter your area or locality.");
      areaInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      areaInputRef.current?.focus();
      return;
    }
    if (!/^\d{6}$/.test(customer.pincode.trim())) {
      e.preventDefault();
      setCustomerError("Please enter a valid 6-digit delivery/project pincode.");
      pincodeInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      pincodeInputRef.current?.focus();
      return;
    }

    setCustomerError("");

    // On mobile devices, window.location.href or direct navigation triggers the WhatsApp app
    // cleanly without opening orphaned blank tabs or getting blocked by popup blockers.
    const isMobile = typeof navigator !== "undefined" && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const url = generateWhatsAppCartUrl();
    if (isMobile) {
      e.preventDefault();
      window.location.href = url;
    }
  };

  return (
    <DialogPrimitive.Root open={isCartOpen} onOpenChange={setIsCartOpen}>
      <AnimatePresence>
        {isCartOpen && (
          <DialogPrimitive.Portal key="enquiry-drawer">
            <DialogPrimitive.Overlay className="enquiry-drawer-overlay" />
            <DialogPrimitive.Content asChild aria-describedby={undefined}>
              <motion.aside
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 320, damping: 32 }}
                className="enquiry-drawer font-sans"
                onClick={(e) => e.stopPropagation()}
                aria-label="Enquiry Drawer"
              >
                {/* Header */}
                <div className="enquiry-drawer-header">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#F3D36B]/15 border border-[#F3D36B]/30 flex items-center justify-center text-[#F3D36B] shadow-sm">
                      <ShoppingBag size={18} />
                    </div>
                    <div>
                      <DialogPrimitive.Title asChild>
                        <h3 className="font-serif text-lg font-bold text-[#F7F6F1] tracking-wide leading-tight">
                          Enquiry Cart
                        </h3>
                      </DialogPrimitive.Title>
                      <span className="text-[11px] font-mono text-[#F3D36B] font-semibold">
                        {cartItems.length} {cartItems.length === 1 ? "item selected" : "items selected"}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="enquiry-drawer-close"
                    onClick={() => setIsCartOpen(false)}
                    aria-label="Close Enquiry Drawer"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Body */}
                <div className="enquiry-drawer-body">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-16 px-4">
                      <div className="w-16 h-16 rounded-2xl bg-[#123F46]/40 border border-[#176B73]/50 flex items-center justify-center mx-auto mb-4 text-[#F3D36B] shadow-lg shadow-black/20">
                        <ShoppingBag size={28} />
                      </div>
                      <h4 className="font-serif text-xl font-bold text-[#F7F6F1] mb-2">
                        Your enquiry cart is empty
                      </h4>
                      <p className="text-xs text-[#B5C9CC] leading-relaxed max-w-xs mx-auto mb-6">
                        Add Birla Opus paints, curated shades from our Colour Finder, or custom finishes from Surface Studio.
                      </p>
                      <div className="flex items-center justify-center gap-3 flex-wrap">
                        <Link
                          href="/colour-finder"
                          className="bg-[#F3D36B] hover:bg-[#FFE082] text-[#0C292F] font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all shadow-md shadow-[#F3D36B]/20"
                          onClick={() => setIsCartOpen(false)}
                        >
                          Browse Shades
                        </Link>
                        <Link
                          href="/paint-products"
                          className="bg-[#123F46] hover:bg-[#176B73] text-[#F7F6F1] border border-[#176B73] font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all"
                          onClick={() => setIsCartOpen(false)}
                        >
                          Browse Products
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Items List */}
                      <div className="space-y-2.5">
                        <AnimatePresence initial={false}>
                          {cartItems.map((item) => {
                            const itemImageUrl =
                              item.imageUrl ||
                              (item.type === "product"
                                ? productMap.get(item.title.toLowerCase()) ||
                                  productMap.get(item.id.replace(/^prod-/, "").toLowerCase())
                                : undefined);

                            return (
                              <motion.div
                                key={item.id}
                                initial={{ opacity: 0, height: 0, scale: 0.95 }}
                                animate={{ opacity: 1, height: "auto", scale: 1 }}
                                exit={{ opacity: 0, height: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="bg-[#123F46]/35 hover:bg-[#123F46]/50 border border-[#176B73]/50 hover:border-[#F3D36B]/40 rounded-2xl p-3.5 transition-all flex items-center gap-3.5 group shadow-sm"
                              >
                                {/* Left Swatch / Visual Product Image */}
                                {item.colourHex ? (
                                  <div
                                    className="w-12 h-12 rounded-xl flex-shrink-0 border-2 border-white/20 shadow-md flex items-center justify-center"
                                    style={{ backgroundColor: item.colourHex }}
                                    title={item.title}
                                  />
                                ) : itemImageUrl ? (
                                  <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-[#F7F6F1] via-[#E7ECEA] to-[#DCE5E2] p-1 flex items-center justify-center flex-shrink-0 border border-[#176B73]/40 shadow-md overflow-hidden group-hover:border-[#F3D36B]/50 transition-colors">
                                    <img
                                      src={itemImageUrl}
                                      alt={item.title}
                                      className="w-full h-full object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                                      loading="lazy"
                                    />
                                  </div>
                                ) : (
                                  <div className="w-12 h-12 rounded-xl bg-[#081E22] border border-[#176B73]/60 flex items-center justify-center text-[#F3D36B] flex-shrink-0 shadow-inner">
                                    {item.type === "product" ? (
                                      <Package size={20} />
                                    ) : item.type === "texture" ? (
                                      <Sparkles size={20} />
                                    ) : (
                                      <Layers size={20} />
                                    )}
                                  </div>
                                )}

                              {/* Center Details */}
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-1.5 mb-1">
                                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#F3D36B]/15 text-[#F3D36B] border border-[#F3D36B]/30">
                                    {item.type === "product"
                                      ? "Product"
                                      : item.type === "texture"
                                      ? "Finish"
                                      : item.type === "shade"
                                      ? "Shade"
                                      : "Estimate"}
                                  </span>
                                </div>
                                <h4 className="font-serif font-medium text-sm text-[#F7F6F1] truncate group-hover:text-[#F3D36B] transition-colors leading-snug">
                                  {item.title}
                                </h4>
                                <p className="text-xs text-[#B5C9CC] truncate mt-0.5">
                                  {item.meta}
                                </p>
                                {(item.finish || item.notes) && (
                                  <p className="text-[11px] text-[#F3D36B]/90 font-mono mt-1 truncate">
                                    {item.finish ? `Finish: ${item.finish}` : item.notes}
                                  </p>
                                )}
                              </div>

                              {/* Right Controls: Quantity & Remove */}
                              <div className="flex items-center gap-2 flex-shrink-0">
                                {item.type === "product" && (
                                  <div className="inline-flex items-center bg-[#081E22] border border-[#176B73]/60 rounded-xl p-0.5 shadow-inner">
                                    <button
                                      type="button"
                                      onClick={() => updateCartQuantity(item.id, -1)}
                                      className="w-6 h-6 flex items-center justify-center text-[#B5C9CC] hover:text-white hover:bg-white/10 rounded-lg font-bold text-sm transition-colors"
                                      aria-label={`Decrease quantity of ${item.title}`}
                                    >
                                      –
                                    </button>
                                    <span className="min-w-[20px] text-center font-mono text-xs font-bold text-[#F3D36B]">
                                      {item.quantity ?? 1}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => updateCartQuantity(item.id, 1)}
                                      className="w-6 h-6 flex items-center justify-center text-[#B5C9CC] hover:text-white hover:bg-white/10 rounded-lg font-bold text-sm transition-colors"
                                      aria-label={`Increase quantity of ${item.title}`}
                                    >
                                      +
                                    </button>
                                  </div>
                                )}

                                <button
                                  type="button"
                                  onClick={() => removeFromCart(item.id)}
                                  className="w-8 h-8 rounded-xl flex items-center justify-center text-[#8A9FA2] hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/25 transition-all"
                                  aria-label={`Remove ${item.title}`}
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </motion.div>
                          );
                        })}
                        </AnimatePresence>
                      </div>

                      {/* Customer Details Section */}
                      <div className="bg-[#081E22]/90 border border-[#176B73]/60 rounded-2xl p-4 shadow-xl">
                        <div className="flex items-center justify-between gap-2 mb-3.5 pb-2.5 border-b border-[#176B73]/30">
                          <div className="flex items-center gap-2">
                            <User size={15} className="text-[#F3D36B]" />
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#F7F6F1]">
                              Customer Details
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={clearCustomerDetails}
                            className="text-[11px] font-mono text-[#8A9FA2] hover:text-[#F3D36B] transition-colors underline"
                          >
                            Clear details
                          </button>
                        </div>

                        {customerError && (
                          <div className="bg-red-500/15 border border-red-500/40 text-red-200 text-xs px-3 py-2 rounded-xl mb-3 flex items-start gap-2 leading-relaxed">
                            <AlertCircle size={15} className="text-red-400 flex-shrink-0 mt-0.5" />
                            <span>{customerError}</span>
                          </div>
                        )}

                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-2.5">
                            <div>
                              <label className="block text-[10px] font-mono uppercase text-[#B5C9CC] mb-1 font-semibold tracking-wider">
                                Your Name *
                              </label>
                              <input
                                ref={nameInputRef}
                                type="text"
                                placeholder="Ramesh Kumar"
                                value={customer.name}
                                onChange={(e) => {
                                  setCustomer({ ...customer, name: e.target.value });
                                  if (customerError) setCustomerError("");
                                }}
                                className="w-full bg-[#06191D] border border-[#176B73]/70 focus:border-[#F3D36B] text-[#F7F6F1] placeholder-[#577579] text-xs rounded-xl px-3 py-2.5 outline-none transition-all focus:ring-1 focus:ring-[#F3D36B]/40"
                                aria-label="Your name"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-mono uppercase text-[#B5C9CC] mb-1 font-semibold tracking-wider">
                                Phone Number *
                              </label>
                              <input
                                ref={phoneInputRef}
                                type="tel"
                                placeholder="10-digit mobile"
                                value={customer.phone}
                                onChange={(e) => {
                                  setCustomer({ ...customer, phone: e.target.value });
                                  if (customerError) setCustomerError("");
                                }}
                                className="w-full bg-[#06191D] border border-[#176B73]/70 focus:border-[#F3D36B] text-[#F7F6F1] placeholder-[#577579] text-xs rounded-xl px-3 py-2.5 outline-none transition-all focus:ring-1 focus:ring-[#F3D36B]/40"
                                aria-label="Phone number"
                                required
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-12 gap-2.5">
                            <div className="col-span-7">
                              <label className="block text-[10px] font-mono uppercase text-[#B5C9CC] mb-1 font-semibold tracking-wider">
                                Area / Locality *
                              </label>
                              <input
                                ref={areaInputRef}
                                type="text"
                                placeholder="Baskhari Chowk"
                                value={customer.areaLocation}
                                onChange={(e) => {
                                  setCustomer({ ...customer, areaLocation: e.target.value });
                                  if (customerError) setCustomerError("");
                                }}
                                className="w-full bg-[#06191D] border border-[#176B73]/70 focus:border-[#F3D36B] text-[#F7F6F1] placeholder-[#577579] text-xs rounded-xl px-3 py-2.5 outline-none transition-all focus:ring-1 focus:ring-[#F3D36B]/40"
                                aria-label="Area or locality"
                                required
                              />
                            </div>
                            <div className="col-span-5">
                              <label className="block text-[10px] font-mono uppercase text-[#B5C9CC] mb-1 font-semibold tracking-wider">
                                Pincode *
                              </label>
                              <input
                                ref={pincodeInputRef}
                                type="text"
                                placeholder="224129"
                                maxLength={6}
                                value={customer.pincode}
                                onChange={(e) => {
                                  setCustomer({ ...customer, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) });
                                  if (customerError) setCustomerError("");
                                }}
                                className="w-full bg-[#06191D] border border-[#176B73]/70 focus:border-[#F3D36B] text-[#F7F6F1] placeholder-[#577579] text-xs rounded-xl px-3 py-2.5 outline-none transition-all focus:ring-1 focus:ring-[#F3D36B]/40 font-mono"
                                aria-label="Pincode"
                                required
                              />
                            </div>
                          </div>
                          <p className="text-[10px] text-[#8A9FA2] mt-1.5 flex items-center gap-1.5 font-mono">
                            <MapPin size={11} className="text-[#F3D36B]" />
                            <span>Baskhari tinting station prepares computerized formulation for this address.</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="enquiry-drawer-footer">
                  <a
                    href={generateWhatsAppCartUrl()}
                    onClick={handleWhatsAppClick}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#25D366] to-[#1EBE5D] hover:from-[#20ba5a] hover:to-[#179c4a] text-[#042412] font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-950/40 transition-all duration-200 active:scale-[0.99]"
                  >
                    <MessageCircle size={18} className="fill-[#042412]" />
                    <span>Send Enquiry on WhatsApp</span>
                  </a>
                  <div className="flex items-center justify-center gap-1.5 mt-2.5 text-[10px] font-mono text-[#8A9FA2]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Direct WhatsApp to Jaymurti Traders (+91 87566 59035)</span>
                  </div>
                </div>
              </motion.aside>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
};
