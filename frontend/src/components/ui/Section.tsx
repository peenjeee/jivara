import React from "react";

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  "aria-labelledby"?: string;
}

export default function Section({
  id,
  className = "",
  children,
  "aria-labelledby": ariaLabelledBy
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-20 md:py-32 px-5 md:px-16 lg:px-24 ${className}`}
      aria-labelledby={ariaLabelledBy}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
}
