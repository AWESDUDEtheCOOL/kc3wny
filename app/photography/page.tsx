"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function PhotographyPage() {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showMetadata, setShowMetadata] = useState(true);
  let inactivityTimer;

  useEffect(() => {
    async function fetchPhotos() {
      const response = await fetch("/api/photos");
      const data = await response.json();
      if (data.error) {
        console.error("Failed to load images:", data.error);
      } else {
        setPhotos(data);
      }
    }
    fetchPhotos();

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      setShowMetadata(true);
      inactivityTimer = setTimeout(() => setShowMetadata(false), 2000);
    };

    window.addEventListener("mousemove", resetInactivityTimer);

    return () => {
      window.removeEventListener("mousemove", resetInactivityTimer);
      clearTimeout(inactivityTimer);
    };
  }, []);

  const openModal = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  if (photos.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container py-24">
      <h1 className="text-4xl font-bold tracking-tighter text-primary mb-8">PHOTOGRAPHY_</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, i) => (
          <div
            key={i}
            className="group relative aspect-square bg-muted border border-primary/20 overflow-hidden"
            onClick={() => openModal(photo)}
          >
            <div className="relative w-full h-full">
              <Image
                src={`/images/${photo}`}
                alt={`Photography ${i + 1}`}
                className="object-cover transition-transform group-hover:scale-105"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity border-t border-primary/20 bg-background/80 backdrop-blur">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 bg-primary retro-glow" />
                <div className="text-xs text-primary">IMG_{String(i + 1).padStart(3, "0")}</div>
              </div>
              <div className="font-medium text-primary mt-1">{photo}</div>
            </div>
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur flex justify-center items-center">
          <div className="relative bg-background p-6 max-w-4xl w-full border border-primary/20">
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 p-2 text-primary text-xl"
            >
              &times;
            </button>
            <div className="relative">
              <Image
                src={`/images/${selectedPhoto}`}
                alt="Fullscreen view"
                className="object-cover w-full h-full"
                width={1000}
                height={1000}
              />
              {/* Bottom Metadata Bar with Navigation */}
              <div
                className={`absolute bottom-0 left-0 right-0 p-2 border-t border-primary/20 bg-background/80 backdrop-blur flex justify-between items-center transition-opacity duration-300 ${showMetadata ? 'opacity-100' : 'opacity-0'}`}
              >
                {/* Left Navigation */}
                <button
                  onClick={() => setSelectedPhoto(photos[photos.indexOf(selectedPhoto) - 1] || selectedPhoto)}
                  className="text-primary text-xl px-3 py-1 hover:bg-background/60 rectangular-md"
                >
                  &lt;
                </button>

                {/* Photo Information */}
                <div className="flex items-center gap-2 text-primary opacity-100">
                  <div className="h-1.5 w-1.5 bg-primary retro-glow" />
                  <div className="text-primary">
                    IMG_{String(photos.indexOf(selectedPhoto) + 1).padStart(3, "0")}
                  </div>
                </div>
                <div className="font-medium text-primary mt-1 opacity-100 text-right">
                  {selectedPhoto}
                </div>

                {/* Right Navigation */}
                <button
                  onClick={() => setSelectedPhoto(photos[photos.indexOf(selectedPhoto) + 1] || selectedPhoto)}
                  className="text-primary text-xl px-3 py-1 hover:bg-background/60 rectangular-md"
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

