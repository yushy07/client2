import { Children, cloneElement, isValidElement, type CSSProperties, type ReactNode } from "react";

type ServiceScrollStackItemProps = {
  children: ReactNode;
  className?: string;
  stackIndex?: number;
};

type ServiceScrollStackProps = {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
};

export function ServiceScrollStackItem({ children, className = "", stackIndex = 0 }: ServiceScrollStackItemProps) {
  return (
    <article
      className={`service-scroll-stack-card scroll-stack-card${className ? ` ${className}` : ""}`}
      role="listitem"
      style={{ "--service-stack-index": stackIndex, "--service-stack-top": `calc(17vh + ${stackIndex * 28}px)` } as CSSProperties}
    >
      {children}
    </article>
  );
}

export default function ServiceScrollStack({ children, className = "", ariaLabel = "Jaymurti Traders service journey" }: ServiceScrollStackProps) {
  return (
    <div className={`service-scroll-stack scroll-stack-adapted${className ? ` ${className}` : ""}`} role="list" aria-label={ariaLabel} data-scroll-stack>
      {Children.map(children, (child, index) => {
        if (!isValidElement<ServiceScrollStackItemProps>(child)) return child;
        return cloneElement(child, { stackIndex: index });
      })}
    </div>
  );
}
