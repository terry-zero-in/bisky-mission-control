import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-lg bg-surface p-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}
