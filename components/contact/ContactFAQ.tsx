import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How long does shipping take?",
    answer:
      "Orders are processed within 24 hours and usually arrive within 3–7 business days.",
  },
  {
    question: "Can I return a product?",
    answer:
      "Yes! You can return products within 30 days if they are unused and in their original packaging.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept Visa, MasterCard, PayPal, Stripe, and Cash on Delivery in selected regions.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship to over 100 countries worldwide.",
  },
];

export default function ContactFAQ() {
  return (
    <section className="width py-16">
      <div className="mx-auto max-w-3xl text-center">
        <span className="rounded-full bg-background px-4 py-2 text-sm font-medium text-primary">
          FAQ
        </span>

        <h2 className="mt-6 text-4xl font-bold">
          Frequently Asked Questions
        </h2>

        <p className="mt-4 text-muted-foreground">
          Find quick answers to the questions we receive most often.
        </p>
      </div>

      <Accordion
        type="single"
        collapsible
        className="mx-auto mt-12 max-w-4xl"
      >
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
          >
            <AccordionTrigger>
              {faq.question}
            </AccordionTrigger>

            <AccordionContent>
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}