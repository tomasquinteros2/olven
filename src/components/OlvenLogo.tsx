type OlvenLogoProps = {
  className?: string;
};

export function OlvenLogo({ className = "h-36 w-36" }: OlvenLogoProps) {
  return (
    <svg
      viewBox="0 0 200 240"
      className={className}
      role="img"
      aria-label="OLVÉN"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M100 8 C98 36 88 54 74 78 C62 100 68 122 88 132 C104 140 118 126 116 108 C114 88 128 66 148 46 C132 74 134 108 118 132 C100 160 80 176 80 200"
        strokeWidth="5.2"
      />
      <ellipse cx="100" cy="188" rx="48" ry="38" strokeWidth="5.2" />
      <path d="M78 188 C86 168 114 168 122 188 C114 208 86 208 78 188" strokeWidth="4.6" />
    </svg>
  );
}
