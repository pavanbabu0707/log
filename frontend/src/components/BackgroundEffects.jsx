export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Top right blue orb */}
      <div 
        className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] rounded-full opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(0,102,255,0.15) 0%, transparent 70%)',
          animation: 'pulse 8s ease-in-out infinite',
        }}
      />
      
      {/* Bottom left purple orb */}
      <div 
        className="absolute -bottom-[200px] -left-[200px] w-[500px] h-[500px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(102,0,255,0.12) 0%, transparent 70%)',
          animation: 'pulse 10s ease-in-out infinite',
          animationDelay: '2s',
        }}
      />

      {/* Center subtle glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(0,102,255,0.05) 0%, transparent 60%)',
        }}
      />

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}
