export default function ContactMap() {
  return (
    <section className="">
      <div className="mb-8 text-center">
        <span className="rounded-full bg-background px-4 py-2 text-sm font-medium text-primary">
          Our Office
        </span>

        <h2 className="mt-5 text-4xl font-bold">
          Visit Our Location
        </h2>

        <p className="mt-3 text-muted-foreground">
          We&apos;d love to meet you. Stop by our office anytime.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl shadow-xl">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps?q=Lahore,Pakistan&output=embed"
          width="100%"
          height="500"
          loading="lazy"
          className="border-0"
        />
      </div>
    </section>
  );
}