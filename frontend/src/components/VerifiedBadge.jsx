export default function VerifiedBadge({ size = 16 }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className="inline-block ml-1 flex-shrink-0"
      aria-label="Verified"
    >
      <circle cx="12" cy="12" r="10" fill="#0066FF"/>
      <path 
        d="M8 12l3 3 5-6" 
        stroke="white" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}
