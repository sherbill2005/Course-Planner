"use client";

import Link, { type LinkProps } from "next/link";
import * as React from "react";

type Ripple = {
  id: number;
  x: number;
  y: number;
  size: number;
};

type RippleButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: LinkProps["href"];
  prefetch?: LinkProps["prefetch"];
  replace?: LinkProps["replace"];
  scroll?: LinkProps["scroll"];
  rippleColor?: string;
  rippleDuration?: number;
};

export function RippleButton({
  children,
  className = "",
  href,
  prefetch,
  replace,
  rippleColor = "rgba(255, 255, 255, 0.45)",
  rippleDuration = 650,
  scroll,
  type = "button",
  onClick,
  ...props
}: RippleButtonProps) {
  const [ripples, setRipples] = React.useState<Ripple[]>([]);
  const nextRippleId = React.useRef(0);

  const createRipple = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;
      const id = nextRippleId.current++;

      setRipples((current) => [...current, { id, x, y, size }]);
      window.setTimeout(() => {
        setRipples((current) => current.filter((ripple) => ripple.id !== id));
      }, rippleDuration);
    },
    [rippleDuration]
  );

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      createRipple(event);
      onClick?.(event as React.MouseEvent<HTMLButtonElement>);
    },
    [createRipple, onClick]
  );

  const content = (
    <>
      <span className="relative z-[1] inline-flex items-center justify-center gap-2">
        {children}
      </span>
      {ripples.map((ripple) => (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full opacity-35"
          key={ripple.id}
          style={{
            animation: `ripple-button ${rippleDuration}ms ease-out forwards`,
            backgroundColor: rippleColor,
            height: ripple.size,
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes ripple-button {
          from {
            transform: scale(0);
            opacity: 0.4;
          }
          to {
            transform: scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );

  const baseClassName = `relative overflow-hidden ${className}`;

  if (href) {
    return (
      <Link
        className={baseClassName}
        href={href}
        onClick={handleClick as React.MouseEventHandler<HTMLAnchorElement>}
        prefetch={prefetch}
        replace={replace}
        scroll={scroll}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={baseClassName}
      onClick={handleClick as React.MouseEventHandler<HTMLButtonElement>}
      type={type}
      {...props}
    >
      {content}
    </button>
  );
}
