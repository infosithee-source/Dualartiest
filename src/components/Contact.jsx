import React from 'react';

const Contact = () => {
  return (
    <div className="w-full h-full bg-red-600 flex flex-col items-center justify-center text-white relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <h2 className="text-[30vw] font-bold">END</h2>
      </div>
      
      <div className="z-10 text-center">
        <h2 className="text-6xl md:text-9xl font-bold mb-8">LET'S TALK</h2>
        <a href="mailto:hello@artist.com" className="text-2xl md:text-4xl border-b-2 border-white hover:text-black hover:border-black transition-colors pb-2">
          hello@artist.com
        </a>
        
        <div className="flex gap-8 justify-center mt-12">
          {['Instagram', 'Twitter', 'ArtStation', 'Behance'].map((social) => (
            <a key={social} href="#" className="uppercase tracking-widest text-sm hover:underline">
              {social}
            </a>
          ))}
        </div>
      </div>

      <footer className="absolute bottom-4 w-full text-center text-white/50 text-xs uppercase tracking-widest">
        © 2025 Artist Portfolio. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Contact;
