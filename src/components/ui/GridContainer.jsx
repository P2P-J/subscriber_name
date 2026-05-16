import { cn } from "@/lib/utils";

export function GridContainer({ children, className, columns = 10 }) {
  return (
    <div
      className={cn(
        "grid overflow-hidden rounded-[12px]",
        "border border-[#D8A5B2]",
        className,
      )}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {children}
    </div>
  );
}
