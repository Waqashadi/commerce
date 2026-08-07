import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";

import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";

const contactItems = [
  {
    icon: Mail,
    title: "Email",
    value: "support@commerce.com",
    href: "mailto:support@commerce.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+92 300 1234567",
    href: "tel:+923001234567",
  },
  {
    icon: MapPin,
    title: "Address",
    value: "Lahore, Punjab, Pakistan",
    href: "#",
  },
  {
    icon: Clock,
    title: "Working Hours",
    value: "Mon - Fri • 9:00 AM - 6:00 PM",
    href: "#",
  },
];

const socials = [
  {
    icon: FaGithub,
    href: "https://github.com/yourusername",
  },
  {
    icon: FaLinkedinIn,
    href: "https://linkedin.com/in/yourusername",
  },
  {
    icon: FaFacebookF,
    href: "https://facebook.com/yourusername",
  },
];

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <span className="rounded-full bg-background px-4 py-2 text-sm font-medium text-primary">
          Contact Information
        </span>

        <h2 className="mt-5 text-4xl font-bold">
          Let&apos;s Start a Conversation
        </h2>

        <p className="mt-4 text-muted-foreground leading-7">
          Have questions about our products or services? We&apos;d love to hear
          from you. Reach out using any of the methods below.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="grid gap-5">
        {contactItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="group flex items-center gap-5 rounded-2xl border bg-background p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-background text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon size={24} />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  {item.title}
                </p>

                <h3 className="font-semibold">
                  {item.value}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Social Links */}
      <div className="rounded-3xl bg-primary p-8 text-primary-foreground">
        <h3 className="text-2xl font-bold">
          Follow Us
        </h3>

        <p className="mt-2 text-primary-foreground/80">
          Stay connected for new products, updates, and exclusive offers.
        </p>

        <div className="mt-6 flex gap-4">
          {socials.map((social, index) => {
            const Icon = social.icon;

            return (
              <Link
                key={index}
                href={social.href}
                target="_blank"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground transition hover:scale-110 hover:bg-background hover:text-primary"
              >
                <Icon size={20} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}