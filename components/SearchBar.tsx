import React from "react";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const SearchBar = () => {
  return (
    <section className="pt-12">
      <div className="width container max-w-3xl mx-auto">
        <div className="relative flex items-center rounded-2xl border bg-background shadow-lg p-2">

          {/* Search Icon */}
          <Search className="absolute left-5 h-5 w-5 text-gray-400"/>

          {/* Input */}
          <Input
            type="text"
            placeholder="Search for products, brands, categories..."
            className="border-0 pl-12 pr-36 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />

          {/* Button */}
          <Button className="absolute right-2 rounded-xl px-6 cursor-pointer">
            Search
          </Button>

        </div>
      </div>
    </section>
  );
};

export default SearchBar;