'use client';

import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

interface SafeImageProps extends Omit<ImageProps, 'src' | 'onError'> {
  src: string | null | undefined;
  fallbackSrc?: string;
  containerClassName?: string;
  fit?: 'cover' | 'contain' | 'fill';
}

const DEFAULT_FALLBACK = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';

export default function SafeImage({
  src,
  alt,
  fallbackSrc = DEFAULT_FALLBACK,
  className = '',
  containerClassName = '',
  fill = false,
  fit = 'cover',
  width,
  height,
  ...props
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src || fallbackSrc);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    setImgSrc(src && src.trim() !== '' ? src : fallbackSrc);
    setHasError(false);
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  const fitClass = fit === 'contain' ? 'object-contain' : fit === 'fill' ? 'object-fill' : 'object-cover';
  const currentSrc = imgSrc || fallbackSrc;
  const isDataOrBlob = currentSrc.startsWith('data:') || currentSrc.startsWith('blob:');

  if (fill) {
    return (
      <div className={`relative w-full h-full overflow-hidden ${containerClassName}`}>
        {isDataOrBlob ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={currentSrc}
            alt={alt || 'Club Image'}
            onError={handleError}
            className={`w-full h-full ${fitClass} ${className}`}
          />
        ) : (
          <Image
            {...props}
            src={currentSrc}
            alt={alt || 'Club Image'}
            fill
            unoptimized
            onError={handleError}
            className={`${fitClass} ${className}`}
          />
        )}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden inline-block ${containerClassName}`}>
      {isDataOrBlob ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={currentSrc}
          alt={alt || 'Club Image'}
          width={width as any}
          height={height as any}
          onError={handleError}
          className={`${fitClass} ${className}`}
        />
      ) : (
        <Image
          {...props}
          src={currentSrc}
          alt={alt || 'Club Image'}
          width={width || 400}
          height={height || 300}
          unoptimized
          onError={handleError}
          className={`${fitClass} ${className}`}
        />
      )}
    </div>
  );
}
