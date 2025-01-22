import React from "react";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className = "", children }: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export function CardHeader({ className = "", children }: CardHeaderProps) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

interface CardTitleProps {
  className?: string;
  children: React.ReactNode;
}

export function CardTitle({ className = "", children }: CardTitleProps) {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>;
}

interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

export function CardContent({ className = "", children }: CardContentProps) {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
}
