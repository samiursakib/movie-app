import { clsx, type ClassValue } from "clsx";
import { ImageLoaderProps } from "next/image";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `https://image.tmdb.org/${src}?w=${width}&q=${quality || 75}`;
};
