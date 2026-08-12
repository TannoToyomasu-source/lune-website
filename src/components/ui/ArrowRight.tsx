type ArrowRightProps = {
  className?: string;
};

/**
 * 文字色（currentColor）に追従する右矢印
 */
export function ArrowRight({ className = "" }: ArrowRightProps) {
  return (
    <svg
      className={["arrowRight", className].filter(Boolean).join(" ")}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M13.2 12L8.6 7.4L10 6L16 12L10 18L8.6 16.6L13.2 12Z"
        fill="currentColor"
      />
    </svg>
  );
}
