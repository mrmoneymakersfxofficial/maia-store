'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  CreditCard,
  QrCode,
  Building2,
  MessageCircle,
  ShieldCheck,
  Copy,
  Check,
  Upload,
  Loader2,
  CheckCircle2,
  X,
  Camera,
  Trash2,
  Plus,
  Minus,
  Truck,
  ChevronRight,
} from 'lucide-react';
import { useRouter } from '@/lib/router';
import { useStore } from '@/lib/store-context';
import { useToast } from '@/lib/toast-context';
import {
  formatPrice,
  bankAccounts,
  qrPayments,
} from '@/lib/store-data';

type PaymentStep = 'method' | 'card' | 'qr' | 'bank' | 'processing' | 'success' | 'error';
type PaymentMethodType = 'card' | 'yape' | 'plin' | 'transferencia';

export default function CheckoutPage() {
  const { navigate, back } = useRouter();
  const { cart, cartTotal, cartCount, updateQuantity, removeFromCart, clearCart } = useStore();
  const { showToast } = useToast();

  const [step, setStep] = useState<PaymentStep>('method');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType | null>(null);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);

  // Card form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardErrors, setCardErrors] = useState<Record<string, string>>({});

  // QR/Bank selected
  const [selectedQR, setSelectedQR] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleMethodSelect = useCallback((method: PaymentMethodType) => {
    setSelectedMethod(method);
    if (method === 'card') setStep('card');
    else if (method === 'yape' || method === 'plin') {
      setSelectedQR(method);
      setStep('qr');
    }
    else if (method === 'transferencia') setStep('bank');
  }, []);

  // Validate card
  const validateCard = useCallback(() => {
    const errors: Record<string, string> = {};
    const cleanCard = cardNumber.replace(/\s/g, '');
    if (cleanCard.length < 13 || cleanCard.length > 19) errors.cardNumber = 'Numero de tarjeta invalido';
    if (!cardName.trim()) errors.cardName = 'Nombre requerido';
    if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) errors.cardExpiry = 'Formato MM/YY';
    if (!/^\d{3,4}$/.test(cardCvv)) errors.cardCvv = 'CVV invalido';
    setCardErrors(errors);
    return Object.keys(errors).length === 0;
  }, [cardNumber, cardName, cardExpiry, cardCvv]);

  const handleCardPay = useCallback(() => {
    if (!validateCard()) return;
    setStep('processing');
    setTimeout(() => {
      clearCart();
      setStep('success');
    }, 2500);
  }, [validateCard, clearCart]);

  // Upload receipt
  const handleReceiptUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('Solo se permiten imagenes');
      return;
    }
    setReceiptFile(file);
    const reader = new FileReader();
    reader.onload = () => setReceiptPreview(reader.result as string);
    reader.readAsDataURL(file);
  }, [showToast]);

  const handleConfirmQR = useCallback(() => {
    if (!receiptFile) {
      showToast('Sube el comprobante de pago');
      return;
    }
    setStep('processing');
    setTimeout(() => {
      clearCart();
      setStep('success');
    }, 2500);
  }, [receiptFile, clearCart, showToast]);

  const handleConfirmBank = useCallback(() => {
    if (!receiptFile) {
      showToast('Sube el comprobante de transferencia');
      return;
    }
    setStep('processing');
    setTimeout(() => {
      clearCart();
      setStep('success');
    }, 2500);
  }, [receiptFile, clearCart, showToast]);

  const copyToClipboard = useCallback(async (text: string, fieldId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldId);
      showToast('Copiado al portapapeles');
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      showToast('No se pudo copiar');
    }
  }, [showToast]);

  const formatCardNumber = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 16);
    return clean.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 4);
    if (clean.length >= 3) return clean.slice(0, 2) + '/' + clean.slice(2);
    return clean;
  };

  if (cart.length === 0 && step !== 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 pb-32">
        <div className="text-center px-4">
          <h1 className="text-2xl font-bold text-foreground mb-3">Tu carrito esta vacio</h1>
          <p className="text-foreground/50 mb-6">Agrega productos para proceder al pago</p>
          <motion.button
            onClick={() => navigate('#/coleccion')}
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Ver Coleccion
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative pt-16 pb-32 sm:pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8 pt-2">
          <button
            onClick={() => back()}
            className="w-9 h-9 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-zinc-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-foreground/60" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">Checkout</h1>
            <p className="text-xs text-foreground/40">
              {cartCount} {cartCount === 1 ? 'producto' : 'productos'} — {formatPrice(cartTotal)}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: Main Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {/* Step: Select Method */}
              {step === 'method' && (
                <motion.div key="method" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
                  <h2 className="text-lg font-bold text-foreground mb-4">Elige tu metodo de pago</h2>
                  {[
                    { id: 'card' as const, icon: CreditCard, title: 'Tarjeta de Credito / Debito', desc: 'Visa, Mastercard, AMEX — Pago seguro y en linea', color: 'bg-blue-50 border-blue-100' },
                    { id: 'yape' as const, icon: QrCode, title: 'Yape', desc: 'Transferencia instantanea con QR', color: 'bg-purple-50 border-purple-100' },
                    { id: 'plin' as const, icon: QrCode, title: 'Plin', desc: 'Transferencia instantanea con QR', color: 'bg-green-50 border-green-100' },
                    { id: 'transferencia' as const, icon: Building2, title: 'Transferencia Bancaria', desc: 'BCP, Interbank, Banco de la Nacion', color: 'bg-zinc-50 border-zinc-200' },
                  ].map((method) => (
                    <motion.button
                      key={method.id}
                      onClick={() => handleMethodSelect(method.id)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 text-left ${method.color} hover:shadow-lg`}
                    >
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                        <method.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-foreground">{method.title}</h3>
                        <p className="text-xs text-foreground/50">{method.desc}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-foreground/20" />
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {/* Step: Card Payment */}
              {step === 'card' && (
                <motion.div key="card" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <button onClick={() => setStep('method')} className="inline-flex items-center gap-1 text-xs text-foreground/40 hover:text-primary mb-4">
                    <ArrowLeft className="w-3.5 h-3.5" /> Volver a metodos
                  </button>
                  <h2 className="text-lg font-bold text-foreground mb-1">Pago con Tarjeta</h2>
                  <p className="text-xs text-foreground/40 mb-6">Tus datos estan protegidos con encriptacion SSL de 256 bits</p>

                  <div className="p-5 rounded-2xl bg-white border border-zinc-100 shadow-sm space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Numero de Tarjeta</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                        className={`w-full px-4 py-3 rounded-xl border text-sm font-mono tracking-wider bg-background transition-colors ${cardErrors.cardNumber ? 'border-red-400 bg-red-50' : 'border-zinc-200 focus:border-primary focus:ring-1 focus:ring-primary/20'} outline-none`}
                      />
                      {cardErrors.cardNumber && <p className="text-[11px] text-red-500 mt-1">{cardErrors.cardNumber}</p>}
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Nombre del Titular</label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="COMO APARECE EN TU TARJETA"
                        className={`w-full px-4 py-3 rounded-xl border text-sm uppercase bg-background transition-colors ${cardErrors.cardName ? 'border-red-400 bg-red-50' : 'border-zinc-200 focus:border-primary focus:ring-1 focus:ring-primary/20'} outline-none`}
                      />
                      {cardErrors.cardName && <p className="text-[11px] text-red-500 mt-1">{cardErrors.cardName}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Expiracion</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                          placeholder="MM/YY"
                          maxLength={5}
                          className={`w-full px-4 py-3 rounded-xl border text-sm font-mono bg-background transition-colors ${cardErrors.cardExpiry ? 'border-red-400 bg-red-50' : 'border-zinc-200 focus:border-primary focus:ring-1 focus:ring-primary/20'} outline-none`}
                        />
                        {cardErrors.cardExpiry && <p className="text-[11px] text-red-500 mt-1">{cardErrors.cardExpiry}</p>}
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">CVV</label>
                        <input
                          type="text"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                          placeholder="123"
                          maxLength={4}
                          className={`w-full px-4 py-3 rounded-xl border text-sm font-mono bg-background transition-colors ${cardErrors.cardCvv ? 'border-red-400 bg-red-50' : 'border-zinc-200 focus:border-primary focus:ring-1 focus:ring-primary/20'} outline-none`}
                        />
                        {cardErrors.cardCvv && <p className="text-[11px] text-red-500 mt-1">{cardErrors.cardCvv}</p>}
                      </div>
                    </div>
                  </div>

                  <motion.button
                    onClick={handleCardPay}
                    className="w-full mt-6 flex items-center justify-center gap-2 bg-primary text-white py-3.5 rounded-xl font-semibold text-sm shadow-lg shadow-turquoise-500/20 hover:bg-turquoise-600 transition-colors"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Pagar {formatPrice(cartTotal)}
                  </motion.button>
                </motion.div>
              )}

              {/* Step: QR Payment (Yape / Plin) */}
              {step === 'qr' && (
                <motion.div key="qr" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <button onClick={() => setStep('method')} className="inline-flex items-center gap-1 text-xs text-foreground/40 hover:text-primary mb-4">
                    <ArrowLeft className="w-3.5 h-3.5" /> Volver a metodos
                  </button>

                  {qrPayments.filter((q) => q.id === selectedQR).map((qr) => (
                    <div key={qr.id} className="space-y-5">
                      <div className="text-center">
                        <h2 className="text-lg font-bold text-foreground mb-1">Pago con {qr.label}</h2>
                        <p className="text-xs text-foreground/40">Escanea el QR o transfiere al numero</p>
                      </div>

                      {/* QR Display */}
                      <div className="flex justify-center">
                        <div className="relative p-6 rounded-2xl bg-white border border-zinc-100 shadow-lg">
                          {/* Decorative glow */}
                          <div className="absolute inset-0 rounded-2xl opacity-20" style={{ background: `radial-gradient(circle, ${qr.color} 0%, transparent 70%)` }} />
                          <div className="relative">
                            {/* QR Placeholder — visual square pattern */}
                            <div className="w-48 h-48 sm:w-56 sm:h-56 bg-white rounded-xl border-2 border-zinc-200 flex items-center justify-center relative overflow-hidden">
                              <div className="absolute inset-2 grid grid-cols-8 grid-rows-8 gap-[2px] opacity-30">
                                {Array.from({ length: 64 }).map((_, i) => (
                                  <div key={i} className="rounded-sm" style={{ backgroundColor: i % 3 === 0 ? qr.color : '#e4e4e7' }} />
                                ))}
                              </div>
                              <div className="relative z-10 text-center">
                                <QrCode className="w-12 h-12 mx-auto mb-2" style={{ color: qr.color }} />
                                <p className="text-sm font-bold" style={{ color: qr.color }}>{qr.label}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Amount & Account Info */}
                      <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                        <div className="text-center mb-4">
                          <p className="text-xs text-foreground/40 mb-1">Monto a pagar</p>
                          <p className="text-2xl font-bold text-primary">{formatPrice(cartTotal)}</p>
                        </div>
                        <div className="flex items-center justify-between bg-white rounded-xl p-3 border border-zinc-200">
                          <div>
                            <p className="text-[10px] text-foreground/40">Numero {qr.label}</p>
                            <p className="text-sm font-bold text-foreground">{qr.number}</p>
                            <p className="text-[10px] text-foreground/40">{qr.holder}</p>
                          </div>
                          <motion.button
                            onClick={() => copyToClipboard(qr.number.replace(/\s/g, ''), `qr-${qr.id}`)}
                            className="w-9 h-9 rounded-full bg-turquoise-50 flex items-center justify-center text-primary hover:bg-turquoise-100 transition-colors"
                            whileTap={{ scale: 0.9 }}
                          >
                            {copiedField === `qr-${qr.id}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </motion.button>
                        </div>
                      </div>

                      {/* Receipt Upload */}
                      <div>
                        <p className="text-xs font-semibold text-foreground/70 mb-2">Sube tu comprobante de pago</p>
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handleReceiptUpload}
                          className="hidden"
                        />
                        {receiptPreview ? (
                          <div className="relative rounded-2xl overflow-hidden border border-zinc-200">
                            <img src={receiptPreview} alt="Comprobante" className="w-full max-h-48 object-cover" />
                            <button
                              onClick={() => { setReceiptFile(null); setReceiptPreview(null); }}
                              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <motion.button
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full flex flex-col items-center gap-2 p-6 rounded-2xl border-2 border-dashed border-zinc-200 hover:border-primary hover:bg-turquoise-50/30 transition-colors"
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="w-12 h-12 rounded-full bg-turquoise-50 flex items-center justify-center">
                              <Camera className="w-6 h-6 text-primary" />
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-semibold text-foreground">Subir Captura</p>
                              <p className="text-[11px] text-foreground/40">Toma una foto o selecciona el archivo</p>
                            </div>
                          </motion.button>
                        )}
                      </div>

                      <motion.button
                        onClick={handleConfirmQR}
                        className="w-full flex items-center justify-center gap-2 text-white py-3.5 rounded-xl font-semibold text-sm shadow-lg transition-colors"
                        style={{ backgroundColor: qr.color }}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Confirmar Pago por {qr.label}
                      </motion.button>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Step: Bank Transfer */}
              {step === 'bank' && (
                <motion.div key="bank" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <button onClick={() => setStep('method')} className="inline-flex items-center gap-1 text-xs text-foreground/40 hover:text-primary mb-4">
                    <ArrowLeft className="w-3.5 h-3.5" /> Volver a metodos
                  </button>
                  <h2 className="text-lg font-bold text-foreground mb-1">Transferencia Bancaria</h2>
                  <p className="text-xs text-foreground/40 mb-6">Realiza tu deposito a cualquiera de nuestras cuentas</p>

                  {/* Amount */}
                  <div className="text-center p-4 rounded-2xl bg-turquoise-50 border border-turquoise-100 mb-5">
                    <p className="text-xs text-foreground/40 mb-1">Monto total a transferir</p>
                    <p className="text-2xl font-bold text-primary">{formatPrice(cartTotal)}</p>
                  </div>

                  {/* Bank accounts */}
                  <div className="space-y-3 mb-5">
                    {bankAccounts.map((account, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-white border border-zinc-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">{account.logo}</span>
                          <div>
                            <h3 className="text-sm font-bold text-foreground">{account.bank}</h3>
                            <p className="text-[10px] text-foreground/40">{account.accountType}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between bg-zinc-50 rounded-xl p-3">
                          <div>
                            <p className="text-[10px] text-foreground/40">Numero de Cuenta</p>
                            <p className="text-sm font-mono font-bold text-foreground tracking-wide">{account.number}</p>
                            <p className="text-[10px] text-foreground/40 mt-0.5">Titular: {account.holder}</p>
                          </div>
                          <motion.button
                            onClick={() => copyToClipboard(account.number.replace(/-/g, ''), `bank-${i}`)}
                            className="w-9 h-9 rounded-full bg-turquoise-50 flex items-center justify-center text-primary hover:bg-turquoise-100 transition-colors flex-shrink-0"
                            whileTap={{ scale: 0.9 }}
                          >
                            {copiedField === `bank-${i}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </motion.button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Receipt Upload */}
                  <div className="mb-5">
                    <p className="text-xs font-semibold text-foreground/70 mb-2">Sube tu comprobante de transferencia</p>
                    <input type="file" accept="image/*" ref={fileInputRef} onChange={handleReceiptUpload} className="hidden" />
                    {receiptPreview ? (
                      <div className="relative rounded-2xl overflow-hidden border border-zinc-200">
                        <img src={receiptPreview} alt="Comprobante" className="w-full max-h-48 object-cover" />
                        <button onClick={() => { setReceiptFile(null); setReceiptPreview(null); }} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <motion.button onClick={() => fileInputRef.current?.click()} className="w-full flex flex-col items-center gap-2 p-6 rounded-2xl border-2 border-dashed border-zinc-200 hover:border-primary hover:bg-turquoise-50/30 transition-colors" whileTap={{ scale: 0.98 }}>
                        <div className="w-12 h-12 rounded-full bg-turquoise-50 flex items-center justify-center"><Upload className="w-6 h-6 text-primary" /></div>
                        <div className="text-center">
                          <p className="text-sm font-semibold text-foreground">Subir Comprobante</p>
                          <p className="text-[11px] text-foreground/40">Captura de la transferencia</p>
                        </div>
                      </motion.button>
                    )}
                  </div>

                  <motion.button
                    onClick={handleConfirmBank}
                    className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3.5 rounded-xl font-semibold text-sm shadow-lg shadow-turquoise-500/20 hover:bg-turquoise-600 transition-colors"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Confirmar Transferencia
                  </motion.button>
                </motion.div>
              )}

              {/* Step: Processing */}
              {step === 'processing' && (
                <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 text-center">
                  <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                  <h2 className="text-lg font-bold text-foreground mb-2">Procesando tu pago...</h2>
                  <p className="text-sm text-foreground/50">Por favor espera un momento</p>
                </motion.div>
              )}

              {/* Step: Success */}
              {step === 'success' && (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-16 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }} className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-5">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Pago Confirmado</h2>
                  <p className="text-sm text-foreground/50 mb-2">Tu pedido ha sido registrado exitosamente</p>
                  <p className="text-xs text-foreground/40 mb-8">Te enviaremos la confirmacion y el numero de rastreo por WhatsApp</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.button onClick={() => navigate('#/')} className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold text-sm" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      Volver al Inicio
                    </motion.button>
                    <motion.a href="https://wa.me/51977333858?text=Hola!%20Acabo%20de%20realizar%20un%20pago%20en%20Maia%20Store" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-semibold text-sm" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <MessageCircle className="w-4 h-4" /> WhatsApp
                    </motion.a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-20 p-5 rounded-2xl bg-white border border-zinc-100 shadow-sm">
              <h3 className="text-sm font-bold text-foreground mb-4">Resumen del Pedido</h3>
              <div className="space-y-3 mb-5">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-zinc-100">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground truncate">{item.product.name}</p>
                      <p className="text-[10px] text-foreground/40">Cantidad: {item.quantity}</p>
                      <p className="text-xs font-bold text-primary">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-zinc-100 pt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-foreground/50">Subtotal</span>
                  <span className="text-xs text-foreground/70">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-foreground/50">Envio</span>
                  <span className="text-xs text-green-600 font-semibold">Gratis</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
                  <span className="text-sm font-bold text-foreground">Total</span>
                  <span className="text-lg font-bold text-primary">{formatPrice(cartTotal)}</span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-[10px] text-foreground/40">
                <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                <span>Pago seguro y encriptado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
