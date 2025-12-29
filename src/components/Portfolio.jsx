import React from 'react';

const projects = [
  { id: 1, title: 'Neon Genesis', category: '3D Render', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop' },
  { id: 2, title: 'Void Walker', category: 'Digital Painting', img: 'https://images.unsplash.com/photo-1633167606204-0760846368c6?q=80&w=2787&auto=format&fit=crop' },
  { id: 3, title: 'Cyber Soul', category: 'Motion Graphics', img: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop' },
  { id: 4, title: 'Chromatic', category: 'Abstract', img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop' },
];

const Portfolio = () => {
  return (
    <div className="w-full min-h-full bg-[#111] text-white p-4 md:p-12 flex flex-col">
      <div className="mb-12">
        <h2 className="text-[10vw] leading-none text-white/10 font-bold absolute top-0 right-0 pointer-events-none select-none">
          WORKS
        </h2>
        <h3 className="text-4xl md:text-6xl font-bold relative z-10 mt-12">SELECTED WORKS</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl mx-auto pb-20">
        {projects.map((project) => (
          <div key={project.id} className="group relative aspect-[4/3] overflow-hidden cursor-pointer">
            <img 
              src={project.img} 
              alt={project.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
              <h4 className="text-3xl md:text-4xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                {project.title}
              </h4>
              <p className="text-red-500 uppercase tracking-widest text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
                {project.category}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Extra content to demonstrate internal scrolling */}
      <div className="max-w-4xl mx-auto text-center py-20">
        <p className="text-2xl text-gray-400 font-light leading-relaxed">
          "Art is not what you see, but what you make others see." <br/>
          <span className="text-sm uppercase tracking-widest mt-4 block text-gray-600">- Edgar Degas</span>
        </p>
      </div>
    </div>
  );
};

export default Portfolio;
