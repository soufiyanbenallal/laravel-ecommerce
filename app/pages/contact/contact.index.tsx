import { useState } from "react";
import { CheckCircle2, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("wholesale");
  const [message, setMessage] = useState("");
  const [processing, setProcessing] = useState(false);
  const [wasSuccessful, setWasSuccessful] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    // Mocking an inquiry send with a luxury micro-animation delay
    setTimeout(() => {
      setProcessing(false);
      setWasSuccessful(true);
      setName("");
      setEmail("");
      setMessage("");
    }, 1200);
  };

  return (
    <div className="bg-background min-h-[70vh] flex items-center">
      <div className="mx-auto max-w-7xl md:px-6 px-2 py-16 md:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Contact Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-4">Contact</p>
              <h1 className="font-display text-4xl md:text-5xl font-light text-foreground leading-tight mb-6">
                Inquire & <br />
                <em className="text-accent not-italic">Collaborate.</em>
              </h1>
              <p className="text-muted-foreground text-[13px] font-light leading-relaxed max-w-sm mb-10">
                For private appointments, wholesale orders, or custom sizing consultations at our workshops in Casablanca and Lisbon.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-11 h-11 border border-border/80 flex items-center justify-center text-accent shrink-0">
                    <Phone className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-[11px] uppercase tracking-[0.2em] font-medium text-foreground">Phone & WhatsApp</h4>
                    <p className="text-muted-foreground text-[12px] mt-0.5 font-light font-mono">+212 6 00 00 00 00</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-11 h-11 border border-border/80 flex items-center justify-center text-accent shrink-0">
                    <Mail className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-[11px] uppercase tracking-[0.2em] font-medium text-foreground">Email Support</h4>
                    <p className="text-muted-foreground text-[12px] mt-0.5 font-light font-mono">atelier@kenzmaison.com</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-11 h-11 border border-border/80 flex items-center justify-center text-accent shrink-0">
                    <MapPin className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-[11px] uppercase tracking-[0.2em] font-medium text-foreground">Bureaux</h4>
                    <p className="text-muted-foreground text-[12px] mt-0.5 font-light">Casablanca, Morocco · Lisbon, Portugal</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 border border-border/60 bg-secondary/20 hidden lg:block">
              <p className="text-[11px] uppercase tracking-[0.16em] text-foreground font-medium">Customer Care Hours</p>
              <p className="text-muted-foreground text-[12px] mt-1 font-light">Monday to Saturday: 09:00 - 18:00 (GMT+1)</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="border border-border/60 bg-card p-8 md:p-10 relative">
              {wasSuccessful && (
                <div className="absolute inset-0 bg-background/95 backdrop-blur-xs z-20 flex flex-col items-center justify-center text-center p-8 animate-fade-in">
                  <div className="w-16 h-16 rounded-full border border-accent/30 flex items-center justify-center mb-6 text-accent">
                    <CheckCircle2 className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-2xl font-light text-foreground mb-3">Message Sent</h3>
                  <p className="text-muted-foreground text-[13px] font-light max-w-[320px] leading-relaxed">
                    Thank you for your inquiry. A studio associate will respond within 24 business hours.
                  </p>
                  <button
                    onClick={() => setWasSuccessful(false)}
                    className="mt-8 border border-border hover:border-accent hover:text-accent px-6 py-3 text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 bg-transparent cursor-pointer"
                  >
                    Send another inquiry
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Soufiyan Benallal"
                    className="w-full bg-secondary/20 border border-border/80 px-4 py-3 text-sm focus:border-accent outline-none transition-all font-light"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. client@domain.com"
                    className="w-full bg-secondary/20 border border-border/80 px-4 py-3 text-sm focus:border-accent outline-none transition-all font-light"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2">
                    Inquiry Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-secondary/20 border border-border/80 px-4 py-3 text-sm focus:border-accent outline-none transition-all font-light cursor-pointer"
                  >
                    <option value="wholesale">Wholesale & Showrooms</option>
                    <option value="fitting">Custom Fitting / Private Appointment</option>
                    <option value="sourcing">Material Sourcing Inquiries</option>
                    <option value="other">General Studio Question</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your inquiry details..."
                    className="w-full bg-secondary/20 border border-border/80 px-4 py-3 text-sm focus:border-accent outline-none transition-all resize-none font-light"
                  />
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full py-4 bg-foreground text-background hover:bg-accent hover:text-accent-foreground font-medium text-[11px] uppercase tracking-[0.22em] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  {processing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" /> Submit Inquiry
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
