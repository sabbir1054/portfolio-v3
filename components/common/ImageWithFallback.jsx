"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageWithFallback({ alt, src, width, height, className, ...props }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="img-fallback-wrapper" style={{ position: "relative", width: "100%", maxWidth: width }}>
      {!loaded && (
        <div className="img-fallback-brand">
          <span className="brand-logo-text">
            mdsabbir<span className="dot">.</span>dev
          </span>
        </div>
      )}
      <Image
        alt={alt}
        src={src}
        width={width}
        height={height}
        className={className}
        onLoad={() => setLoaded(true)}
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.4s ease" }}
        {...props}
      />
    </div>
  );
}
