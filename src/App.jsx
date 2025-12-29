import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Hero from "./components/Hero";
import Commissions from "./components/Commissions";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import ErrorBoundary from "./components/ErrorBoundary";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  const sectionRefs = useRef([]);
  const lenisRef = useRef(null);
  const scrollStopsRef = useRef([]); 
  const ghostRef = useRef(null);

  useEffect(() => {
    console.log("App Mounted. Initializing Lenis & GSAP...");

    // 1. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });
    
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Setup GSAP Timeline
    const ctx = gsap.context(() => {
      const sections = sectionRefs.current;
      const viewportHeight = window.innerHeight;
      
      // Calculate configuration for each section
      const sectionConfigs = sections.map((section, i) => {
        if (!section) return null;
        const content = section.firstElementChild;
        
        // Physical height of the content
        const realHeight = content ? Math.max(content.scrollHeight, viewportHeight) : viewportHeight;
        
        // Check for extra "wait" time (pinning duration) requested by the component
        let extraScroll = 0;
        if (content && content.dataset.extraScroll) {
          extraScroll = parseInt(content.dataset.extraScroll, 10) || 0;
        }

        return {
          realHeight,
          // The total scroll distance this section occupies in the timeline (excluding entry transition)
          // internalScroll + extraWait
          internalDuration: (realHeight - viewportHeight) + extraScroll,
          // The actual pixel distance the content needs to move visually
          yMove: realHeight - viewportHeight
        };
      });

      let totalScroll = 0;
      const navStops = []; 

      // Calculate total scroll distance needed and navigation stops
      sectionConfigs.forEach((cfg, i) => {
        if (!cfg) return;
        
        const transitionDuration = i === 0 ? 0 : viewportHeight; 
        
        // The point where this section finishes its entry wipe and becomes fully visible
        navStops.push(totalScroll + transitionDuration);
        
        totalScroll += transitionDuration + cfg.internalDuration;
      });

      scrollStopsRef.current = navStops;
      console.log("Navigation Stops:", navStops);

      // Update the Ghost Spacer height DIRECTLY
      if (ghostRef.current) {
        ghostRef.current.style.height = `${totalScroll + viewportHeight}px`;
      }

      // Force GSAP refresh to recognize new document height
      ScrollTrigger.refresh();

      // Create the Master Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body, 
          start: "top top",
          end: "bottom bottom",
          scrub: 0, 
          invalidateOnRefresh: true, 
        }
      });

      // --- ANIMATION LOGIC ---
      sections.forEach((section, i) => {
        if (!section || !sectionConfigs[i]) return;
        
        const content = section.firstElementChild;
        const cfg = sectionConfigs[i];
        
        // 1. TRANSITION IN (Wipe)
        if (i > 0) {
          let fromVars = {};
          if (i === 1) fromVars = { xPercent: -100, zIndex: 20 }; 
          else if (i === 2) fromVars = { xPercent: 100, zIndex: 30 }; 
          else fromVars = { yPercent: -100, zIndex: 40 }; 

          tl.fromTo(section, 
            { ...fromVars, visibility: 'visible' }, // Ensure visibility
            { 
              xPercent: 0, 
              yPercent: 0, 
              ease: "none",
              duration: viewportHeight 
            }
          );
          
          // Recede previous section
          if (sectionRefs.current[i-1]) {
            tl.to(sectionRefs.current[i-1], {
              scale: 0.9,
              filter: "brightness(0.5)",
              duration: viewportHeight,
              ease: "none"
            }, "<");
          }
        }

        // 2. INTERNAL SCROLL (OR WAIT)
        // If internalDuration > 0, we consume scroll space.
        // We animate 'y' by yMove. If yMove is 0, it acts as a pin/wait.
        if (cfg.internalDuration > 0 && content) {
          tl.to(content, {
            y: -cfg.yMove,
            ease: "none",
            duration: cfg.internalDuration
          });
        }
      });

    });

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  const scrollToSection = (index) => {
    console.log(`Navigating to section ${index}...`);
    if (lenisRef.current && scrollStopsRef.current[index] !== undefined) {
      lenisRef.current.scrollTo(scrollStopsRef.current[index], { duration: 1.5 });
    } else {
      console.error("Lenis ref missing or invalid index");
    }
  };

  return (
    <>
      <Navbar onNavigate={scrollToSection} />

      {/* GHOST SPACER */}
      <div ref={ghostRef} className="w-full pointer-events-none opacity-0" />

      {/* FIXED STAGE */}
      <main className="fixed inset-0 w-full h-full overflow-hidden">
        
        {/* SECTION 1: HERO */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          className="absolute inset-0 w-full h-full z-10 bg-black will-change-transform"
        >
          <div className="w-full h-full">
            <ErrorBoundary>
              <Hero />
            </ErrorBoundary>
          </div>
        </section>

        {/* SECTION 2: COMMISSIONS */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          className="absolute inset-0 w-full h-full z-20 bg-zinc-900 will-change-transform"
        >
           {/* Added explicit full dimensions to container */}
           <div className="w-full h-full">
            <ErrorBoundary>
              <Commissions />
            </ErrorBoundary>
          </div>
        </section>

        {/* SECTION 3: PORTFOLIO */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          className="absolute inset-0 w-full h-full z-30 bg-white text-black will-change-transform"
        >
           <div className="w-full min-h-full">
            <ErrorBoundary>
              <Portfolio />
            </ErrorBoundary>
          </div>
        </section>

        {/* SECTION 4: CONTACT */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          className="absolute inset-0 w-full h-full z-40 bg-red-600 text-white will-change-transform"
        >
           <div className="w-full h-full">
            <ErrorBoundary>
              <Contact />
            </ErrorBoundary>
          </div>
        </section>

      </main>
    </>
  );
}

export default App;
