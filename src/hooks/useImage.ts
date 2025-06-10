import { RefObject, useLayoutEffect, useRef, useState } from 'react';

export const Status = {
  Loaded: 'loaded',
  Loading: 'loading',
} as const;

type Status = (typeof Status)[keyof typeof Status];

export default function useImage(
  ref: RefObject<HTMLElement>,
  src?: string,
  lazyLoading = true,
): Status {
  const [status, setStatus] = useState<Status>(Status.Loading);
  const imageRef = useRef<HTMLImageElement | null>();

  function cleanup() {
    if (imageRef.current) {
      imageRef.current.onload = null;
      imageRef.current = null;
    }
  }

  useLayoutEffect(() => {
    if (!src || ref.current === null) {
      return;
    }
    const lazyImageRef = ref.current;
    setStatus(Status.Loading);
    cleanup();

    function loadImage(src: string) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setStatus(Status.Loaded);
        cleanup();
      };

      imageRef.current = img;
    }

    if (lazyLoading) {
      const lazyImageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadImage(src);
            lazyImageObserver.unobserve(lazyImageRef);
          }
        });
      });
      lazyImageObserver.observe(lazyImageRef);
    } else {
      loadImage(src);
    }

    return () => {
      cleanup();
    };
  }, [src, lazyLoading, ref]);

  return status;
}
