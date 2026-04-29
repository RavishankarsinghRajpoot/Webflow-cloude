"use client";

import type { JSX as ReactJSX } from "react";
import { CSSProperties, ReactNode } from "react";

type CommonProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

type BlockProps = CommonProps & {
  tag?: keyof ReactJSX.IntrinsicElements;
};

type SectionProps = CommonProps & {
  tag?: "section";
};

type LinkProps = CommonProps & {
  button?: boolean;
  options?: {
    href?: string;
    target?: string;
    rel?: string;
  };
};

export function Block({ tag: Tag = "div", ...props }: BlockProps) {
  return <Tag {...props} />;
}

export function Section({ tag: Tag = "section", ...props }: SectionProps) {
  return <Tag {...props} />;
}

export function Link({
  button = false,
  options,
  children,
  className,
  style,
}: LinkProps) {
  if (button) {
    return (
      <a
        href={options?.href}
        target={options?.target}
        rel={options?.rel}
        className={className}
        style={{
          display: "inline-block",
          textDecoration: "none",
          ...style,
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={options?.href}
      target={options?.target}
      rel={options?.rel}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}
