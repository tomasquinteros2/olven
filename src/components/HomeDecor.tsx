export function HomeDecor() {
  return (
    <>
      <svg
        className="pointer-events-none absolute -left-10 -top-8 h-[42%] w-[48%] max-w-xl opacity-80"
        viewBox="0 0 500 500"
        aria-hidden="true"
      >
        <g fill="#efe8de" stroke="#d9cfc3" strokeWidth="0.6">
          {Array.from({ length: 28 }).map((_, index) => {
            const x = 40 + (index % 7) * 48 + (index % 2) * 16;
            const y = 30 + Math.floor(index / 7) * 58 + (index % 3) * 10;
            return (
              <g key={index} transform={`translate(${x} ${y}) rotate(${index * 17})`}>
                <circle r="11" cx="0" cy="-6" fill="#f7f3ee" />
                <circle r="9" cx="8" cy="2" fill="#efe6d9" />
                <circle r="8" cx="-7" cy="4" fill="#f4eee6" />
                <circle r="4" fill="#cbbba8" />
              </g>
            );
          })}
        </g>
      </svg>

      <svg
        className="pointer-events-none absolute -bottom-20 -right-16 h-[70%] w-[70%] max-w-4xl opacity-70"
        viewBox="0 0 800 800"
        aria-hidden="true"
      >
        <path
          d="M120 720 C180 520 280 430 430 390 C580 350 690 250 760 80"
          fill="none"
          stroke="#d8c8b6"
          strokeWidth="90"
          strokeLinecap="round"
          opacity="0.35"
        />
        <path
          d="M80 760 C220 560 360 470 520 430 C680 390 760 240 790 40"
          fill="none"
          stroke="#eadfd2"
          strokeWidth="140"
          strokeLinecap="round"
          opacity="0.45"
        />
      </svg>
    </>
  );
}
