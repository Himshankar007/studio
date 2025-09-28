import type { SVGProps } from 'react';

export function DharmaWheelIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="m2 12 h2" />
      <path d="m20 12 h2" />
      <path d="m4.93 19.07 1.41-1.41" />
      <path d="m17.66 6.34 1.41-1.41" />
    </svg>
  );
}

export function VajraIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2 L8 12 L12 22 L16 12 Z" />
      <path d="M5 9 L2 12 L5 15" />
      <path d="M19 9 L22 12 L19 15" />
      <path d="M9 6 L15 6" />
      <path d="M9 18 L15 18" />
    </svg>
  );
}

export function EndlessKnotIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            {...props}
        >
            <path d="M8 18 L8 15 C8 13.34 9.34 12 11 12 L13 12 C14.66 12 16 13.34 16 15 L16 18"/>
            <path d="M18 16 L15 16 C13.34 16 12 14.66 12 13 L12 11 C12 9.34 10.66 8 9 8 L6 8"/>
            <path d="M16 6 L16 9 C16 10.66 14.66 12 13 12 L11 12 C9.34 12 8 10.66 8 9 L8 6"/>
            <path d="M6 8 L9 8 C10.66 8 12 9.34 12 11 L12 13 C12 14.66 13.34 16 15 16 L18 16"/>
        </svg>
    )
}
