import CheckoutForm from "@/components/checkout/CheckoutForm";
import OrderSummary from "@/components/checkout/OrderSummary";

const  page = () => {
  return (
    <section className="container mx-auto py-12">
      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CheckoutForm />
        </div>

        <div>
          <OrderSummary />
        </div>
      </div>
    </section>
  );
}

export default page