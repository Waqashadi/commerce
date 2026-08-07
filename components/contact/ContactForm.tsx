"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.email("Please enter a valid email."),
  subject: z.string().min(3, "Subject is required."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      console.log(data);

      // Fake API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Message sent successfully!");

      reset();
    } catch {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="rounded-3xl border bg-background p-8 shadow-lg">
      <h2 className="mb-6 text-3xl font-bold">
        Send us a message
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Name */}
        <div>
          <Input
            placeholder="Full Name"
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-accent">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <Input
            type="email"
            placeholder="Email Address"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-accent">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Subject */}
        <div>
          <Input
            placeholder="Subject"
            {...register("subject")}
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-accent">
              {errors.subject.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <Textarea
            rows={6}
            placeholder="Write your message..."
            {...register("message")}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-accent">
              {errors.message.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-5 mx-auto "
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </div>
  );
}