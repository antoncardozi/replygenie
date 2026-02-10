import { ReactNode } from 'react';

interface ToolWrapperProps {
  children: ReactNode;
  title?: string;
}

export default function ToolWrapper({ children, title }: ToolWrapperProps) {
  return (
    <section className="w-full rounded-xl border border-border bg-background p-6 md:p-8 shadow-sm">
      {title && <h2 className="mb-6 text-xl font-semibold">{title}</h2>}
      <div className="min-h-[300px]">{children}</div>
    </section>
  );
}
