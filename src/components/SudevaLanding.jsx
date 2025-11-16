/* SudevaLanding.jsx
   Single-file React component for Sudeva Engineers website (based on uploaded image). 

   Required dependencies:
   - react, react-dom
   - framer-motion
   - react-icons
   - Tailwind CSS configured in your project

   Notes:
   - Replace placeholder image assets with your actual image files.
   - Contact form simulates async submission locally (no server call).
   - Colors, spacing, and components are mobile-first and responsive.
*/

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiMail, FiPhone, FiMapPin, FiLinkedin, FiTwitter, FiInstagram, FiFacebook, FiYoutube } from "react-icons/fi";

export default function SudevaLanding() {
  // mobile nav
  const [navOpen, setNavOpen] = useState(false);

  // newsletter form
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterState, setNewsletterState] = useState("idle");

  // contact form
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [formState, setFormState] = useState("idle");

  // HERO slideshow
  const images = [
    "/images/1_front web page.jpg",
    "/images/2_front web page.jpg",
    "/images/3_front web page.jpg",
    "/images/4_front web page.jpg",
  ];
  const [currentImg, setCurrentImg] = useState(0);

  // preload images
  useEffect(() => {
    images.forEach((p) => {
      const img = new Image();
      img.src = encodeURI(p);
    });
  }, []);

  // cycle every 3 seconds
  useEffect(() => {
    if (!images || images.length === 0) return;
    const id = setInterval(() => {
      setCurrentImg((i) => (i + 1) % images.length);
    }, 3000);
    return () => clearInterval(id);
  }, [images.length]);
  function validateForm() {
    return form.name.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && form.message.trim();
  }
  function submitForm(e) {
    e?.preventDefault();
    if (!validateForm()) {
      setFormState("error");
      setTimeout(() => setFormState("idle"), 2200);
      return;
    }
    setFormState("sending");
    setTimeout(() => {
      setFormState("success");
      setForm({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setFormState("idle"), 3000);
    }, 1200);
  }

  function handleNewsletter(e) {
    e?.preventDefault();
    if (!newsletterEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) {
      setNewsletterState("error");
      setTimeout(() => setNewsletterState("idle"), 2000);
      return;
    }
    setNewsletterState("success");
    setNewsletterEmail("");
    setTimeout(() => setNewsletterState("idle"), 3000);
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* HEADER / NAVIGATION */}
  <header className="fixed top-0 left-0 right-0 z-50 bg-white text-slate-900 shadow-sm border-b border-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img src="/images/logo.png" alt="Sudeva Engineers" className="h-32 w-auto" onError={(e) => { e.currentTarget.style.display = 'none'; const s = e.currentTarget.nextSibling; if (s) s.style.display = 'inline-block'; }} />
                <span className="font-bold text-xl" style={{ display: 'none' }}>SUDEVA ENGINEERS</span>
              </div>
              <nav className="hidden md:flex items-center gap-6 text-sm" aria-label="Main">
                <a href="#home" className="text-slate-700 hover:text-emerald-800">Home</a>
                <a href="#about" className="text-slate-700 hover:text-emerald-800">About</a>
                <a href="#services" className="text-slate-700 hover:text-emerald-800">Services</a>
                <a href="#projects" className="text-slate-700 hover:text-emerald-800">Projects</a>
                <a href="#blog" className="text-slate-700 hover:text-emerald-800">Solar Solutions</a>
                <a href="#contact" className="text-slate-700 hover:text-emerald-800">Contact</a>
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:block">
                <a href="#contact" className="inline-flex items-center px-4 py-2 rounded-md bg-emerald-800 text-white hover:bg-emerald-900 border border-emerald-800 font-medium">
                  Get a Quote
                </a>
              </div>
              <div className="md:hidden">
                <button onClick={() => setNavOpen(true)} className="p-2 rounded-md" aria-label="Open menu"><FiMenu /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
            {navOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="md:hidden bg-white text-slate-900 shadow-lg">
              <div className="px-4 pt-4 pb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="font-bold text-slate-900">SUDEVA ENGINEERS</div>
                  <button onClick={() => setNavOpen(false)} aria-label="Close menu" className="p-2 rounded-md"><FiX /></button>
                </div>
                <nav className="flex flex-col gap-3">
                  <a href="#home" onClick={() => setNavOpen(false)} className="py-2 text-slate-700 hover:text-emerald-800">Home</a>
                  <a href="#about" onClick={() => setNavOpen(false)} className="py-2 text-slate-700 hover:text-emerald-800">About</a>
                  <a href="#services" onClick={() => setNavOpen(false)} className="py-2 text-slate-700 hover:text-emerald-800">Services</a>
                  <a href="#projects" onClick={() => setNavOpen(false)} className="py-2 text-slate-700 hover:text-emerald-800">Projects</a>
                  <a href="#blog" onClick={() => setNavOpen(false)} className="py-2 text-slate-700 hover:text-emerald-800">Blog</a>
                  <a href="#contact" onClick={() => setNavOpen(false)} className="py-2 text-slate-700 hover:text-emerald-800">Contact</a>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main id="main">
        {/* HERO SECTION */}
        <section id="home" className="relative pt-16 min-h-[600px] flex items-center">
          {/* Background Image Slideshow */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {/* Render the current image with a subtle fade; keep gradient overlay for legibility */}
            <AnimatePresence>
              <motion.img
                key={currentImg}
                src={encodeURI(images[currentImg])}
                alt={`Hero ${currentImg + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full h-full object-cover absolute inset-0"
              />
            </AnimatePresence>

            <div className="w-full h-full bg-gradient-to-br from-emerald-800/40 to-green-900/40">
              {/* gradient overlay to ensure text contrast */}
            </div>
          </div>

          <div className="relative z-10 max-w-7xl ml-0 px-4 sm:px-6 lg:px-8 py-20 font-poppins">
            <div className="max-w-2xl text-left">
              <motion.h1 
                initial={{ y: 20, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
              >
                Engineering solutions that build and power tomorrow
              </motion.h1>
              <motion.p 
                initial={{ y: 20, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ delay: 0.1 }}
                className="text-lg sm:text-xl text-white/90 mb-8"
              >
                Designing and delivering sustainable solar, construction, and infrastructure solutions.
              </motion.p>
              <motion.div 
                initial={{ y: 20, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ delay: 0.2 }}
                className="flex flex-wrap gap-4"
              >
                <a href="#about" className="inline-flex items-center px-6 py-3 bg-white text-emerald-800 rounded-md font-medium hover:bg-emerald-50">
                  Learn More
                </a>
                <a href="#projects" className="inline-flex items-center px-6 py-3 bg-emerald-800 text-white rounded-md font-medium hover:bg-emerald-900 border-2 border-white">
                  Our Projects
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ENGINEERING EXCELLENCE SECTION */}
        <section className="bg-emerald-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="pr-8 flex items-center justify-center">
                <h2 className="text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight text-center">
                  Why us?
                </h2>
              </div>
              <div className="pl-8">
                <p className="text-lg mb-8 text-white/90">
                  Sustainable infrastructure through precision engineering and human-centered, tech-driven design
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <img src={encodeURI('/Sudeva Website Assets/Icons/eco.png')} alt="eco" className="w-8 h-8 mt-1" />
                    <div>
                      <div className="font-semibold">Sustainable innovations</div>
                      <div className="text-white/80">Driving technological progress with low environmental impact</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <img src={encodeURI('/Sudeva Website Assets/Icons/engineering.png')} alt="engineering" className="w-8 h-8 mt-1" />
                    <div>
                      <div className="font-semibold">Integrated expertise</div>
                      <div className="text-white/80">Solving real-world engineering problems with cross-disciplinary teams</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <img src={encodeURI('/Sudeva Website Assets/Icons/priority.png')} alt="priority" className="w-8 h-8 mt-1" />
                    <div>
                      <div className="font-semibold">Safety & reliability</div>
                      <div className="text-white/80">Ensuring reliability and peace of mind for all stakeholders</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OUR SERVICES SECTION */}
        <section id="services" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Services</h2>
              <h3 className="text-xl text-slate-600 mb-4">Comprehensive solar solutions for sustainable transformation</h3>
                <p className="text-slate-600 max-w-3xl mx-auto">
                  End-to-end solar services: consult, design, install, maintain.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Service Card 1 */}
              <article className="rounded-lg overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-64 bg-slate-200 overflow-hidden rounded-t-lg">
                  <img src={encodeURI('/Sudeva Website Assets/Services/Placeholder Image.png')} alt="Interior construction" className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Solar EPC and consulting services</h3>
                  <p className="text-slate-600 mb-4">
                    Expertise in Engineering, Procurement, and Construction (EPC) for solar projects of all scales, coupled with strategic consulting.
                  </p>
                  <a href="#contact" className="text-emerald-600 font-medium hover:underline">Learn more &gt;</a>
                </div>
              </article>

              {/* Service Card 2 */}
              <article className="rounded-lg overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-64 bg-slate-200 overflow-hidden rounded-t-lg">
                  <img src={encodeURI('/Sudeva Website Assets/Services/Image.png')} alt="Rooftop with solar panels" className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Premium construction and POP finishing</h3>
                  <p className="text-slate-600 mb-4">
                    Delivering high-quality construction services and specialized Point of Purchase (POP) finishing for commercial and residential spaces.
                  </p>
                  <a href="#contact" className="text-emerald-600 font-medium hover:underline">Learn more &gt;</a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* COMPREHENSIVE SOLAR SOLUTIONS SECTION */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="block text-sm font-medium text-slate-500 mb-2">Solar</span>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">Comprehensive solar solutions for sustainable transformation</h2>
              <p className="text-slate-600 max-w-3xl mx-auto">Sudeva Engineers provides end-to-end solar services from feasibility to maintenance, ensuring profitable and sustainable solar adoption</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Comprehensive site analysis and financial modeling",
                  description: "Detailed feasibility studies that unlock solar potential for every project.",
                  img: '../../images/EPC1.png'
                },
                {
                  title: "Advanced PV system design and technical optimization",
                  description: "Leveraging cutting-edge software to maximize solar performance and energy yield.",
                  img: '../../images/PVsyst.jpg'
                },
                {
                  title: "End-to-end EPC execution with precision",
                  description: "Seamless procurement, installation, and commissioning of solar infrastructure.",
                  img: '../../images/EPC3.png'
                }
              ].map((item, idx) => (
                <article key={idx} className="bg-white">
                  <div className="rounded-2xl bg-slate-200 overflow-hidden h-56 mb-6">
                    <img src={encodeURI(item.img)} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-center mb-4">{item.title}</h3>
                  <p className="text-center text-slate-600 max-w-md mx-auto">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CRAFTING SPACES SECTION */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="block text-sm font-medium text-slate-500 mb-2">Construction</span>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">Crafting spaces that breathe life and purpose</h2>
              <p className="text-slate-600 max-w-3xl mx-auto">From structural construction to POP interiors, Sudeva Engineers combines engineering precision with artistic design</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "General construction for modern living",
                  description: "Residential and commercial projects that meet the highest standards of quality and functionality.",
                  img: '/images/conc1.png'
                },
                {
                  title: "Innovative POP design and finishing",
                  description: "Sculptural false ceilings and wall treatments that elevate architectural aesthetics.",
                  img: '/images/conc2.png'
                },
                {
                  title: "Renovation that reimagines potential",
                  description: "Strategic remodeling that breathes new life into existing spaces with minimal disruption.",
                  img: '/Sudeva Website Assets/Portfolio/Placeholder Image-1.png'
                },
              ].map((item, idx) => (
                <article key={idx} className="bg-white">
                  <div className="rounded-2xl bg-slate-200 overflow-hidden h-56 mb-6">
                    <img src={encodeURI(item.img)} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-center mb-4">{item.title}</h3>
                  <p className="text-center text-slate-600 max-w-md mx-auto">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED ENGINEERING PROJECTS SECTION */}
        <section id="projects" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="block text-sm font-medium text-slate-500 mb-2">Case Studies</span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-4">Featured engineering projects</h2>
              <p className="text-slate-600 max-w-3xl mx-auto">
                Showcasing our commitment to excellence across solar and construction domains.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Project Card 1 */}
              <article className="bg-white rounded-2xl border border-slate-800 overflow-hidden shadow-sm">
                <div className="p-4">
                  <div className="rounded-2xl overflow-hidden border-2 border-slate-800">
                    <img src={encodeURI('/Sudeva Website Assets/Portfolio/Placeholder Image.png')} alt="Hotel Clarks Inn" className="w-full h-64 object-cover block rounded-t-2xl" />
                  </div>
                </div>
                <div className="p-6 border-t border-slate-200 bg-white">
                  <h3 className="text-2xl font-extrabold mb-2">Hotel Clarks Inn, Moradabad</h3>
                  <p className="text-slate-600 mb-4">Executed by Sudeva Pvt. Ltd, this hotel project exemplifies our proficiency in high-quality construction and advanced POP craftsmanship, delivering durability, precision, and superior aesthetic standards.</p>
                  <div className="flex flex-wrap gap-3">
                    <span className="text-sm px-3 py-1 border rounded-full border-slate-300">Interior</span>
                    <span className="text-sm px-3 py-1 border rounded-full border-slate-300">Design</span>
                    <span className="text-sm px-3 py-1 border rounded-full border-slate-300">Renovation</span>
                  </div>
                </div>
              </article>

              {/* Project Card 2 */}
              <article className="bg-white rounded-2xl border border-slate-800 overflow-hidden shadow-sm">
                <div className="p-4">
                  <div className="rounded-2xl overflow-hidden border-2 border-slate-800">
                    <img src={encodeURI('/Sudeva Website Assets/Portfolio/Placeholder Image-1.png')} alt="Hotel Neelkanth Star" className="w-full h-64 object-cover block rounded-t-2xl" />
                  </div>
                </div>
                <div className="p-6 border-t border-slate-200 bg-white">
                  <h3 className="text-2xl font-extrabold mb-2">Hotel Neelkanth Star, Rajabpur</h3>
                  <p className="text-slate-600 mb-4">Constructed by Sudeva Pvt. Ltd, this hotel showcases our expertise in structural precision and advanced POP finishing, reflecting our commitment to quality and engineering excellence.</p>
                  <div className="flex flex-wrap gap-3">
                    <span className="text-sm px-3 py-1 border rounded-full border-slate-300">Interior</span>
                    <span className="text-sm px-3 py-1 border rounded-full border-slate-300">Design</span>
                    <span className="text-sm px-3 py-1 border rounded-full border-slate-300">Renovation</span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ENGINEERING KNOWLEDGE THAT MATTERS SECTION */}
        <section id="blog" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Engineering knowledge that matters</h2>
              <p className="text-slate-600 max-w-3xl mx-auto">
                Stay informed with our insights and articles on the latest trends, innovations, and best practices in engineering, solar energy, and construction.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              {[
                {
                  title: 'On-Grid Solar System',
                  description: 'Ideal for urban homes, businesses, and institutions that benefit from reliable grid access. This system reduces electricity bills by feeding excess power back to the grid and improves overall energy efficiency.',
                  img: '/Sudeva Website Assets/Blog/Placeholder Image.png'
                },
                {
                  title: 'Off-Grid Solar System',
                  description: 'Perfect for remote areas, farms, and industries without stable grid connectivity. This setup stores excess power and ensures uninterrupted supply via battery storage.',
                  img: '/Sudeva Website Assets/Blog/6.png'
                },
                {
                  title: 'Hybrid Solar System',
                  description: 'Combines grid power with battery backup to provide both flexibility and resilience — ideal for commercial buildings and critical operations.',
                  img: '/Sudeva Website Assets/Blog/Gemini_Generated_Image_4uzni14uzni14uzn 1.png'
                }
              ].map((card, idx) => (
                <article key={idx} className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  <div className={`flex flex-col md:flex-row items-center md:items-stretch ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="md:w-1/2 w-full h-56 md:h-72 bg-white overflow-hidden">
                      <img src={encodeURI(card.img)} alt={card.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="md:w-1/2 w-full p-8 bg-white">
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 text-sm border rounded-full border-slate-300 text-slate-700">Knowledge</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                      <p className="text-slate-700 text-lg">{card.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT US SECTION */}
        <section id="about" className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">About Us</h2>
                <p className="text-slate-600 mb-6">
                    Sudeva Engineers provides practical, sustainable engineering across solar and construction, with a focus on quality and client outcomes.
                  </p>
                
                <h3 className="text-xl font-semibold mb-3">Strategic Approach</h3>
                <p className="text-slate-600 mb-6">
                  We combine deep industry knowledge with a forward-thinking approach to tackle complex engineering challenges and deliver optimal results.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Sustainable Impact</h3>
                <p className="text-slate-600">
                  Committed to environmental stewardship, we integrate sustainable practices into every project, contributing to a greener future.
                </p>
              </div>
              <div className="h-96 bg-slate-200 rounded-lg overflow-hidden">
                <img src={encodeURI('/Sudeva Website Assets/Hero/5.png')} alt="About us" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* TEAM SECTION */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Team</h2>
              <p className="text-slate-600 max-w-3xl mx-auto">
                Meet the dedicated professionals who drive our success and embody our commitment to excellence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  name: "Deepak Yadav",
                  role: "CEO & Director",
                  description: "Deepak Yadav, Director and CEO of Sudeva Engineers, leading advanced solar EPC solutions with strong engineering expertise. An IIT Delhi graduate, he designs efficient, high-precision solar plants using tools like PVsyst, driving the company’s focus on technology and sustainable execution.",
                  img: '/images/Team/Deepak yadav.jpeg'
                },
                {
                  name: "Suresh Yadav",
                  role: "Chairman",
                  description: "Suresh Yadav, serves as the Chairman of Sudeva Engineers, bringing over 25 years of experience in high-end construction and project execution. His leadership anchors the company’s commitment to quality, reliability, and long-term trust..",
                  img: '/images/Team/Suresh Yadav.jpeg'
                }
              ].map((member, idx) => (
                <div key={idx} className="bg-slate-50 rounded-lg p-6 border border-slate-200 shadow-sm">
                  <div className="h-64 bg-slate-200 rounded-lg mb-4 overflow-hidden">
                    <img src={encodeURI(member.img)} alt={member.name} className="w-full h-full object-contain object-center rounded-lg bg-white p-2" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <div className="text-emerald-600 font-medium mb-3">{member.role}</div>
                  <p className="text-slate-600 mb-4">{member.description}</p>
                  <div className="flex gap-3">
                    <a href="#" aria-label="LinkedIn" className="p-2 rounded-md border border-slate-300 hover:bg-slate-100">
                      <FiLinkedin />
                    </a>
                    <a href="#" aria-label="Twitter" className="p-2 rounded-md border border-slate-300 hover:bg-slate-100">
                      <FiTwitter />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT US SECTION */}
        <section id="contact" className="py-16 bg-slate-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Contact Us</h2>
              <p className="text-white/80 max-w-3xl mx-auto">
                Get in touch with us for inquiries, collaborations, or project discussions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Email */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-600 mb-4">
                  <FiMail className="text-2xl" />
                </div>
                  <h3 className="text-xl font-semibold mb-2">Email</h3>
                  <p className="text-white/80 mb-4">sudevaengineers@gmail.com</p>
                  <a href="mailto:sudevaengineers@gmail.com" className="text-emerald-400 hover:underline">Send a message</a>
              </div>

              {/* Phone */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-600 mb-4">
                  <FiPhone className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Phone</h3>
                <p className="text-white/80 mb-4">+91 7983581207</p>
                <a href="tel:+917983581207" className="text-emerald-400 hover:underline">Call us now</a>
              </div>

              {/* Office */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-600 mb-4">
                  <FiMapPin className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Office</h3>
                <p className="text-white/80 mb-4">7B/118 Phase 2 Buddhi Vihar, Moradabad 244001</p>
                <a href="#" className="text-emerald-400 hover:underline">Get directions</a>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-emerald-800 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Left Column */}
              <div>
                <div className="font-bold text-xl mb-4">SUDEVA ENGINEERS</div>
                <p className="text-white/80 mb-6">Engineering solutions that build and power tomorrow.</p>
                <div className="mb-4">
                  <p className="text-sm mb-2">Subscribe to our newsletter</p>
                  <form onSubmit={handleNewsletter} className="flex gap-2">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Email address"
                      aria-label="Newsletter email address"
                      className="flex-1 px-3 py-2 rounded-md text-slate-900"
                    />
                    <button type="submit" className="px-4 py-2 bg-white text-emerald-800 rounded-md font-medium hover:bg-emerald-50">
                      Subscribe
                    </button>
                  </form>
                  {newsletterState === "success" && <p className="text-sm text-emerald-300 mt-2">Subscribed successfully!</p>}
                  {newsletterState === "error" && <p className="text-sm text-red-300 mt-2">Please enter a valid email.</p>}
                </div>
                <p className="text-sm text-white/60">© 2023 Sudeva Engineers. All rights reserved.</p>
              </div>

              {/* Middle Column */}
              <div>
                <h3 className="font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="#home" className="text-white/80 hover:text-white">Home</a></li>
                  <li><a href="#about" className="text-white/80 hover:text-white">About</a></li>
                  <li><a href="#services" className="text-white/80 hover:text-white">Services</a></li>
                  <li><a href="#projects" className="text-white/80 hover:text-white">Projects</a></li>
                  <li><a href="#blog" className="text-white/80 hover:text-white">Blog</a></li>
                  <li><a href="#contact" className="text-white/80 hover:text-white">Contact</a></li>
                </ul>
              </div>

              {/* Right Column */}
              <div>
                <h3 className="font-semibold mb-4">Follow Us</h3>
                <div className="flex gap-3 mb-6">
                  <a href="#" aria-label="Instagram" className="p-2 rounded-md border border-white/20 hover:bg-white/10">
                    <FiInstagram />
                  </a>
                  <a href="#" aria-label="LinkedIn" className="p-2 rounded-md border border-white/20 hover:bg-white/10">
                    <FiLinkedin />
                  </a>
                  <a href="#" aria-label="Twitter" className="p-2 rounded-md border border-white/20 hover:bg-white/10">
                    <FiTwitter />
                  </a>
                  <a href="#" aria-label="Facebook" className="p-2 rounded-md border border-white/20 hover:bg-white/10">
                    <FiFacebook />
                  </a>
                  <a href="#" aria-label="YouTube" className="p-2 rounded-md border border-white/20 hover:bg-white/10">
                    <FiYoutube />
                  </a>
                </div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-white/80 hover:text-white">Privacy Policy</a></li>
                  <li><a href="#" className="text-white/80 hover:text-white">Terms of Service</a></li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
              <div><a href="#" className="hover:text-white">Site Map</a></div>
              <div>
                <a href="#" className="hover:text-white">Privacy Policy</a> | <a href="#" className="hover:text-white">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

