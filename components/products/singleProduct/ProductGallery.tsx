"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  images: string[];
}

export default function ProductGallery({
  images,
}: Props) {
  const [selectedImage, setSelectedImage] = useState(
    images[0]
  );

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-background">
        <Image
          src={selectedImage}
          alt=""
          fill
          className="object-contain p-8"
        />
      </div>

      <div className="mt-5 flex gap-3">
        {images.map((image) => (
          <button
            key={image}
            onClick={() => setSelectedImage(image)}
            className="relative h-24 w-24 overflow-hidden rounded-xl border"
          >
            <Image
              src={image}
              alt=""
              fill
              className="object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}