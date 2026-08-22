"use client";

import { useState } from "react";

export default function FounderAvatar({
  name,
  initials,
  photoSrc,
}: {
  name: string;
  initials: string;
  photoSrc?: string;
}) {
  const [photoFailed, setPhotoFailed] = useState(false);
  const showPhoto = photoSrc && !photoFailed;

  if (showPhoto) {
    return (
      <div className="relative h-[120px] w-[120px] shrink-0 overflow-hidden rounded-full border-2 border-[#f59e0b]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoSrc}
          alt={name}
          className="h-full w-full object-cover object-[center_top]"
          onError={() => setPhotoFailed(true)}
        />
      </div>
    );
  }

  return (
    <div className="flex h-[120px] w-[120px] shrink-0 items-center justify-center rounded-full border-2 border-[#f59e0b] bg-gradient-to-br from-[#0a0f2c] to-[#050714]">
      <span className="font-heading-mono text-xl font-bold text-[#f59e0b]">{initials}</span>
    </div>
  );
}
