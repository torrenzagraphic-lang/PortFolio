import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_URL = "https://wa.me/+918200014895";

export default function WhatsAppFloat() {
    return (
        <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Open WhatsApp"
            className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full border border-border/60 bg-primary text-primary-foreground shadow-glass animate-pulse transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
            <FaWhatsapp className="h-7 w-7" aria-hidden="true" />
        </a>
    );
}
