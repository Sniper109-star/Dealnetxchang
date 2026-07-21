"use client";

type Props = {
  name: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function TrackButton({ name, children, className, onClick }: Props) {
  return (
    <button
      onClick={async () => {
        const userId = document.cookie
          .split("; ")
          .find((row) => row.startsWith("user_id="))
          ?.split("=")[1];

        await fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "button_click", metadata: { name }, userId }),
        });

        onClick?.();
      }}
      className={className}
    >
      {children}
    </button>
  );
}
