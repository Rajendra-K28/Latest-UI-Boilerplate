export function Database({ color = 'currentColor', size = 20 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 13.3333C14.6024 13.3333 18.3333 11.7259 18.3333 9.75C18.3333 7.77411 14.6024 6.16667 10 6.16667C5.39763 6.16667 1.66667 7.77411 1.66667 9.75C1.66667 11.7259 5.39763 13.3333 10 13.3333Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.3333 9.75V14.25C18.3333 16.2259 14.6024 17.8333 10 17.8333C5.39763 17.8333 1.66667 16.2259 1.66667 14.25V9.75"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.66667 5.25C1.66667 7.22589 5.39763 8.83333 10 8.83333C14.6024 8.83333 18.3333 7.22589 18.3333 5.25C18.3333 3.27411 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 3.27411 1.66667 5.25Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.66667 5.25V9.75"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.3333 5.25V9.75"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
