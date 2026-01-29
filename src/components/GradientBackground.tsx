export function GradientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#FF6B35] opacity-[0.08] blur-[120px] rounded-full"></div>
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#4A9FFF] opacity-[0.06] blur-[100px] rounded-full"></div>
      <div className="absolute bottom-0 left-1/3 w-[550px] h-[550px] bg-[#9B59B6] opacity-[0.05] blur-[110px] rounded-full"></div>
      <div className="absolute top-2/3 right-1/4 w-[450px] h-[450px] bg-[#50C878] opacity-[0.04] blur-[90px] rounded-full"></div>
      
      {/* Noise Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      ></div>
    </div>
  );
}
