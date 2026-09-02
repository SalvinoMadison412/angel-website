import { HTMLAttributes } from "react";

export default function Container({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 ${className}`} {...props} />;
}
