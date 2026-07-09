import { ArrowUp, Star, ShieldAlert } from 'lucide-react';
import { sfx } from '../utils/sound';

export default function Footer() {
  const handleBackToTop = () => {
    sfx.playSwoosh();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    {
      title: 'Our Flavors',
      items: [
        { label: 'Dr Pepper Original', id: 'products' },
        { label: 'Dr Pepper Cherry', id: 'products' },
        { label: 'Dr Pepper Zero Sugar', id: 'products' },
        { label: 'Cream Soda Blend', id: 'products' },
        { label: 'Strawberries & Cream', id: 'products' }
      ]
    },
    {
      title: 'Pepper Pack Life',
      items: [
        { label: 'Loyalty Rewards Program', id: 'rewards' },
        { label: 'SEC Tuition Giveaway', id: 'rewards' },
        { label: 'Exclusive Swag Shop', id: 'rewards' },
        { label: 'Fan Club Login', id: 'rewards' }
      ]
    },
    {
      title: 'About Waco',
      items: [
        { label: 'Waco Heritage Museum', id: 'story' },
        { label: 'Charles Alderton Story', id: 'story' },
        { label: 'Retro 10-2-4 History', id: 'story' },
        { label: 'Dr Pepper Snapple Group', id: 'story' }
      ]
    },
    {
      title: 'Support & Help',
      items: [
        { label: 'Store Locator Finder', id: 'stores' },
        { label: 'Product Nutrition Specs', id: 'products' },
        { label: 'Frequently Asked FAQ', id: 'faq-section' },
        { label: 'Corporate Contact Us', id: 'faq-section' }
      ]
    }
  ];

  const handleLinkClick = (id: string) => {
    sfx.playTick();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-dark-cherry text-cream border-t border-cream/10 pt-16 pb-12 relative overflow-hidden text-left">
      {/* Absolute floating backdrop circles */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] rounded-full bg-gold blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Upper footer split layout */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 border-b border-cream/10 pb-12">
          {/* Brand description panel column */}
          <div className="col-span-2 md:col-span-4 flex flex-col items-start">
            <div className="flex items-center gap-2 group cursor-pointer mb-5">
              <div className="w-10 h-10 rounded-none bg-burgundy flex items-center justify-center border border-gold/30">
                <span className="text-cream font-serif font-bold text-lg tracking-tighter">DrP</span>
              </div>
              <div className="flex flex-col">
                <span className="text-cream font-serif font-black tracking-widest text-xl leading-none">
                  Dr Pepper
                </span>
                <span className="text-gold text-[9px] uppercase font-mono tracking-widest font-bold mt-0.5 leading-none">
                  Est. 1885 • Waco TX
                </span>
              </div>
            </div>

            <p className="text-cream/70 text-xs sm:text-sm leading-relaxed max-w-sm font-sans">
              America's oldest major soft drink brand, proudly operating for over 140 years. Blending 23 secret, proprietary flavor nodes to champion one-of-a-kind taste rebels since 1885.
            </p>

            <div className="flex gap-3.5 mt-6">
              {['Instagram', 'Twitter', 'YouTube', 'TikTok'].map((social) => (
                <a
                  key={social}
                  href={`https://${social.toLowerCase()}.com`}
                  onMouseEnter={() => sfx.playTick()}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cream/50 hover:text-gold font-mono text-[10px] uppercase tracking-wider transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Map links columns */}
          {footerLinks.map((col) => (
            <div key={col.title} className="col-span-1 md:col-span-2 text-left">
              <h4 className="text-gold font-serif font-extrabold text-xs uppercase tracking-widest mb-4">
                {col.title}
              </h4>
              <div className="flex flex-col gap-2.5">
                {col.items.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleLinkClick(link.id)}
                    className="text-cream/60 hover:text-cream text-xs font-sans font-medium transition-colors cursor-pointer text-left focus:outline-none"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Lower copyright bar with Back to Top trigger */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="text-left text-cream/40 text-[11px] font-mono uppercase tracking-widest">
            <span>© {new Date().getFullYear()} Keurig Dr Pepper Inc. • All Rights Reserved.</span>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2.5">
              <a href="#privacy" className="hover:text-cream/80">Privacy Policy</a>
              <span>•</span>
              <a href="#terms" className="hover:text-cream/80">Terms of Use</a>
              <span>•</span>
              <a href="#accessibility" className="hover:text-cream/80">Accessibility Statement</a>
            </div>
          </div>

          {/* Animated Float Back To Top button */}
          <button
            onClick={handleBackToTop}
            onMouseEnter={() => sfx.playTick()}
            className="group shrink-0 bg-burgundy hover:bg-burgundy/80 border border-cream/10 hover:border-gold p-3 rounded-none text-cream/60 hover:text-cream transition-all duration-300 shadow-md flex items-center gap-2 text-xs font-mono uppercase tracking-widest cursor-pointer"
            aria-label="Back to Top"
          >
            <span>Back To Top</span>
            <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Corporate legal FDA label disclaimer panel */}
        <div className="mt-8 border-t border-cream/10 pt-6 text-cream/40 text-[10px] font-sans flex gap-2.5 text-left max-w-4xl">
          <ShieldAlert size={14} className="shrink-0 text-cream/40 mt-0.5" />
          <p className="leading-relaxed">
            Corporate Trademark Notice: Dr Pepper, Snapple, and 10-2-4 are registered trademarks of Keurig Dr Pepper Inc. All referenced Unsplash and Pexels images are simulated illustrations representing product serving suggestions and lifestyle visuals. Drink responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
}
