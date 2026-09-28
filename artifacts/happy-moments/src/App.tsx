import { useEffect, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowDown, ArrowRight, BookOpen, BriefcaseBusiness, Check, Clapperboard,
  ExternalLink, Gift, Globe2, Instagram, Mail, MapPin, Menu, MessageCircle,
  Palette, Play, Send, Sparkles, X, Phone,
} from 'lucide-react';
import posterDesign from '@assets/3_1790602543615.jpeg';
import artGifts from '@assets/4_1790602543615.jpeg';
import bannerDesign from '@assets/5_1790602543616.jpeg';
import events from '@assets/6_1790602543616.jpeg';
import additionalServices from '@assets/7_1790602543617.jpeg';
import instagramHandling from '@assets/8_1790602543617.jpeg';
import websiteDesign from '@assets/9_1790602543617.jpeg';
import logoMark from '@assets/10_1790602543618.jpeg';
import contactArtwork from '@assets/11_1790602543618.jpeg';
import servicesArtwork from '@assets/12_1790602543618.jpeg';
import studyCraft from '@assets/WhatsApp_Image_2026-09-28_at_4.01.53_PM_1790602543619.jpeg';
import videoCreation from '@assets/WhatsApp_Image_2026-09-28_at_4.01.54_PM_1790602543619.jpeg';

const queryClient = new QueryClient();
const WA_NUMBER = '919444789973';
const instagramUrl = 'https://www.instagram.com/Happy_Moments_135/';
const mapUrl = 'https://www.google.com/maps/search/?api=1&query=B2%2C+Jumbo+Square+62+%26+63%2C+Venkatesa+Perumal+2nd+Street%2C+Madipakkam%2C+Chennai+600092';

function whatsapp(message: string) {
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
}

type PortfolioItem = {
  id: string;
  image: string;
  title: string;
  category: string;
  description: string;
  message: string;
};

const portfolio: PortfolioItem[] = [
  { id: 'poster', image: posterDesign, title: 'Customized Poster Designing', category: 'Posters', description: 'Birthday, wedding, business, festival and memory posters shaped around your story.', message: 'Hi Happy Moments, I am interested in customized poster designing.' },
  { id: 'gifts', image: artGifts, title: 'Arts & Gift Services', category: 'Art & Gifts', description: 'Personalized portraits, frames, keychains, charms, covers and gifts made for meaningful moments.', message: 'Hi Happy Moments, I am interested in personalized gifts.' },
  { id: 'banners', image: bannerDesign, title: 'Banner Making & Flex Designing', category: 'Banners', description: 'Bold designs for businesses, shops, functions, schools, launches and grand openings.', message: 'Hi Happy Moments, I need a banner/flex design.' },
  { id: 'events', image: events, title: 'Event Management', category: 'Events', description: 'Thoughtful arrangements for birthdays, weddings, anniversaries, corporate and special occasions.', message: 'Hi Happy Moments, I need event management.' },
  { id: 'additional', image: additionalServices, title: 'Additional Services', category: 'Business', description: 'Social posts, reels, flyers, menus, thank-you cards, visiting cards and certificates.', message: 'Hi Happy Moments, I need additional design services.' },
  { id: 'instagram', image: instagramHandling, title: 'Instagram Account Handling', category: 'Social Media', description: 'Content planning, scheduling, stories, reels, engagement and performance reports.', message: 'Hi Happy Moments, I am interested in Instagram account handling.' },
  { id: 'website', image: websiteDesign, title: 'Customized Website Designing', category: 'Websites', description: 'Responsive, user-friendly websites with SEO-friendly structure and ongoing support.', message: 'Hi Happy Moments, I am interested in website designing.' },
  { id: 'study', image: studyCraft, title: 'Study Craft', category: 'Academic', description: 'Typing, assignments, projects, reports, PPTs and study resources for 11th and 12th.', message: 'Hi Happy Moments, I need information about Study Craft.' },
  { id: 'video', image: videoCreation, title: 'Customized Video Creation', category: 'Videos', description: 'Birthday, wedding, anniversary, invitation, business and photo-plus-song videos.', message: 'Hi Happy Moments, I need a customized video.' },
  { id: 'identity', image: logoMark, title: 'The Happy Moments Mark', category: 'Business', description: 'The emblem behind a studio where ideas become beautiful creations.', message: 'Hi Happy Moments, I would like to know more about your creative services.' },
  { id: 'contact', image: contactArtwork, title: 'Find Happy Moments', category: 'Business', description: 'Visit, write or connect with the studio in Madipakkam, Chennai.', message: 'Hi Happy Moments, I would like to connect with your Chennai studio.' },
  { id: 'services', image: servicesArtwork, title: 'Our Services', category: 'Business', description: 'Explore the complete Happy Moments service family: create, celebrate, remember.', message: 'Hi Happy Moments, I would like to explore your services.' },
];

const navItems = [
  ['About', 'about'], ['Services', 'services'], ['Portfolio', 'portfolio'],
  ['Videos', 'videos'], ['Study Craft', 'study'], ['Events', 'events'], ['Contact', 'contact'],
];

type Service = { title: string; description: string; icon: LucideIcon; message: string; image: string; anchor: string };
const services: Service[] = [
  { title: 'Study Craft', description: 'Organized academic support, formatting and study resources.', icon: BookOpen, message: 'Hi Happy Moments, I need information about Study Craft services.', image: studyCraft, anchor: 'study' },
  { title: 'Poster Creating', description: 'A beautiful visual language for the moments you want to keep.', icon: Palette, message: 'Hi Happy Moments, I am interested in customized poster designing.', image: posterDesign, anchor: 'posters' },
  { title: 'Video Creation', description: 'Your photos and feeling, edited into a story with rhythm.', icon: Clapperboard, message: 'Hi Happy Moments, I need a customized video.', image: videoCreation, anchor: 'videos' },
  { title: 'Arts & Gifts', description: 'Personalized keepsakes, portraits, frames and little surprises.', icon: Gift, message: 'Hi Happy Moments, I am interested in personalized gifts.', image: artGifts, anchor: 'gifts' },
  { title: 'Banner & Flex', description: 'Clear, bold designs that help an occasion make an entrance.', icon: BriefcaseBusiness, message: 'Hi Happy Moments, I need a banner/flex design.', image: bannerDesign, anchor: 'banners' },
  { title: 'Event Management', description: 'From themes to catering, we make the room feel like you.', icon: Sparkles, message: 'Hi Happy Moments, I need event management.', image: events, anchor: 'events' },
  { title: 'Instagram Handling', description: 'A consistent social presence with content and care.', icon: Instagram, message: 'Hi Happy Moments, I am interested in Instagram account handling.', image: instagramHandling, anchor: 'instagram' },
  { title: 'Website Designing', description: 'An online home that feels as considered as your brand.', icon: Globe2, message: 'Hi Happy Moments, I am interested in website designing.', image: websiteDesign, anchor: 'website' },
];

function WhatsAppButton({ message, children = 'Chat on WhatsApp', className = 'primary-btn' }: { message: string; children?: ReactNode; className?: string }) {
  return <button data-testid="button-whatsapp" className={className} onClick={() => whatsapp(message)}><MessageCircle size={16} />{children}</button>;
}

function Navbar({ onMenu }: { onMenu: () => void }) {
  return (
    <>
      <nav className="hm-nav" aria-label="Primary navigation">
        <a className="brand-lockup" href="#home" data-testid="link-brand">
          <img src={logoMark} alt="Happy Moments HM emblem" />
          <span>Happy Moments</span>
        </a>
        <div className="nav-links">
          {navItems.map(([label, id]) => <a key={id} href={`#${id}`} data-testid={`link-nav-${id}`}>{label}</a>)}
        </div>
        <WhatsAppButton message="Hi Happy Moments, I would like to share an idea." className="nav-whatsapp"><MessageCircle size={15} /> WhatsApp</WhatsAppButton>
        <button className="menu-btn" onClick={onMenu} aria-label="Open navigation menu" data-testid="button-menu"><Menu size={24} /></button>
      </nav>
    </>
  );
}

function ServiceCard({ service, onOpen }: { service: Service; onOpen: (item: PortfolioItem) => void }) {
  const Icon = service.icon;
  const item = portfolio.find((p) => p.image === service.image) ?? portfolio[0];
  return (
    <article className="service-card" data-testid={`card-service-${service.anchor}`}>
      <div className="service-icon"><Icon size={23} /></div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <button className="text-link" onClick={() => onOpen(item)} data-testid={`button-explore-${service.anchor}`}>Explore service <ArrowRight size={14} /></button>
    </article>
  );
}

function PortfolioModal({ item, onClose }: { item: PortfolioItem; onClose: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="portfolio-dialog-title">
        <button className="modal-close" onClick={onClose} aria-label="Close design preview" data-testid="button-close-modal"><X size={18} /></button>
        <div className="modal-img-wrap"><img src={item.image} alt={`${item.title} Happy Moments design`} /></div>
        <div className="modal-body">
          <span className="eyebrow">{item.category}</span>
          <h2 id="portfolio-dialog-title">{item.title}</h2>
          <p className="lead">{item.description}</p>
          <div className="gold-line" style={{ margin: '1.5rem 0' }} />
          <p className="lead" style={{ fontSize: '.82rem' }}>Tell us what you want to remember, and we will shape the details around your style.</p>
          <div className="modal-actions">
            <WhatsAppButton message={item.message}>Order this</WhatsAppButton>
            <WhatsAppButton message={`${item.message} I would like to customize a similar design.`} className="ghost-btn">Create similar</WhatsAppButton>
            <WhatsAppButton message={item.message} className="ghost-btn">WhatsApp us</WhatsAppButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function PortfolioCard({ item, onOpen }: { item: PortfolioItem; onOpen: (item: PortfolioItem) => void }) {
  return (
    <button className="portfolio-card" onClick={() => onOpen(item)} data-testid={`card-portfolio-${item.id}`} aria-label={`Open ${item.title} preview`}>
      <img src={item.image} alt={`${item.title} portfolio artwork`} loading="lazy" />
      <span className="portfolio-open"><ExternalLink size={14} /></span>
      <div className="portfolio-overlay"><span>{item.category}</span><h3>{item.title}</h3></div>
    </button>
  );
}

function DetailSection({ id, eyebrow, title, description, image, bullets, cta, message, dark = false, reverse = false, previewItem, onPreview }: { id: string; eyebrow: string; title: ReactNode; description: string; image: string; bullets: string[]; cta: string; message: string; dark?: boolean; reverse?: boolean; previewItem?: PortfolioItem; onPreview?: (item: PortfolioItem) => void }) {
  return (
    <section id={id} className={`${dark ? 'dark-section' : ''} section-pad`} aria-labelledby={`${id}-title`}>
      <div className="section-wrap">
        <div className={`split-card ${dark ? 'dark' : ''}`} style={{ direction: reverse ? 'rtl' : 'ltr' }}>
          <div style={{ direction: 'ltr' }}>
            <button onClick={() => previewItem && onPreview?.(previewItem)} style={{ border: 0, padding: 0, background: 'none', width: '100%', cursor: previewItem ? 'pointer' : 'default' }} aria-label={previewItem ? `Open ${previewItem.title} preview` : undefined} data-testid={previewItem ? `button-preview-${id}` : undefined}>
              <img className="showcase-img" src={image} alt={`${id} Happy Moments service`} loading="lazy" />
            </button>
          </div>
          <div style={{ direction: 'ltr' }}>
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="section-heading" id={`${id}-title`}>{title}</h2>
            <p className="lead" style={{ marginTop: '1rem' }}>{description}</p>
            <ul className="bullet-list">{bullets.map((bullet) => <li key={bullet}><Check size={16} /> {bullet}</li>)}</ul>
            <WhatsAppButton message={message}>{cta} <ArrowRight size={15} /></WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState<PortfolioItem | null>(null);
  const [filter, setFilter] = useState('All');
  useEffect(() => {
    document.title = 'Happy Moments | Creative Design, Video, Events & Digital Services';
    const description = 'Happy Moments creates customized posters, videos, banners, gifts, event experiences, websites, social media content and creative designs that turn special moments into beautiful memories.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.setAttribute('name', 'description'); document.head.appendChild(meta); }
    meta.setAttribute('content', description);
    let keywords = document.querySelector('meta[name="keywords"]');
    if (!keywords) { keywords = document.createElement('meta'); keywords.setAttribute('name', 'keywords'); document.head.appendChild(keywords); }
    keywords.setAttribute('content', 'Happy Moments, poster designing, customized poster design, birthday poster, wedding poster, video editing, event management, banner designing, personalized gifts, Instagram management, website designing, Study Craft, creative design Chennai');
  }, []);
  const visiblePortfolio = filter === 'All' ? portfolio : portfolio.filter((item) => item.category === filter);
  const filters = ['All', 'Posters', 'Videos', 'Art & Gifts', 'Banners', 'Events', 'Social Media', 'Websites', 'Academic', 'Business'];
  const scrollAndClose = () => setMenuOpen(false);
  return (
    <main className="hm-shell noise" id="home">
      <Navbar onMenu={() => setMenuOpen((open) => !open)} />
      {menuOpen && <div className="mobile-menu" aria-label="Mobile navigation">{navItems.map(([label, id]) => <a key={id} href={`#${id}`} onClick={scrollAndClose} data-testid={`link-mobile-${id}`}>{label}</a>)}<WhatsAppButton message="Hi Happy Moments, I would like to share an idea." className="primary-btn">Chat on WhatsApp</WhatsAppButton></div>}

      <section className="hero" aria-labelledby="hero-title">
        <span className="petal p1" /><span className="petal p2" /><span className="petal p3" /><span className="petal p4" />
        <div className="hero-copy">
          <div>
            <div className="hero-kicker">A creative studio in Chennai</div>
            <h1 className="hero-title" id="hero-title">Happy<span>Moments</span></h1>
            <p className="hero-tagline">Your moments have a story.</p>
            <p className="hero-description">Let us turn it into something you’ll treasure forever. From one thoughtful poster to an entire event, your idea becomes our creation.</p>
            <div className="hero-actions">
              <a className="primary-btn" href="#services" data-testid="link-explore-services">Explore our services <ArrowDown size={15} /></a>
              <WhatsAppButton message="Hi Happy Moments, I have an idea and would like to create something special.">Chat on WhatsApp</WhatsAppButton>
            </div>
          </div>
          <div className="hero-mark" aria-label="Happy Moments emblem">
            <div className="hero-rings" /><img src={logoMark} alt="HM Happy Moments Create Celebrate Remember emblem" />
            <div className="hero-stamp">Create<br />Celebrate<br />Remember</div>
          </div>
        </div>
        <div className="scroll-cue">Scroll to explore<span /></div>
      </section>

      <div className="intro-strip"><div className="section-wrap marquee"><span>Create</span><b>•</b><span>Celebrate</span><b>•</b><span>Remember</span><b>•</b><span>Made for your moment</span></div></div>

      <section className="section-pad" id="about" aria-labelledby="about-title">
        <div className="section-wrap" style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '4rem', alignItems: 'end' }}>
          <div><span className="eyebrow">The studio note</span><h2 className="section-heading" id="about-title">Ideas deserve<br /><em>a keepsake.</em></h2></div>
          <div><p className="lead">Happy Moments is a warm, artistic creative studio for individuals, couples, families, students, events and businesses. We bring together design, storytelling and practical digital support so you can share something that feels unmistakably yours.</p><p className="script" style={{ fontSize: '2.3rem', color: '#a01873', marginTop: '1rem' }}>Your vision. Our creativity. Beautiful results.</p></div>
        </div>
      </section>

      <section className="services-band section-pad" id="services" aria-labelledby="services-title">
        <div className="section-wrap">
          <span className="eyebrow">Create • Celebrate • Remember</span><h2 className="section-heading" id="services-title">Our <em>services</em></h2><p className="lead">Your vision. Our creativity. Beautiful results.</p>
          <div className="service-grid">{services.map((service) => <ServiceCard key={service.title} service={service} onOpen={setSelected} />)}</div>
        </div>
      </section>

      <DetailSection id="posters" eyebrow="Personalized design" title={<>Customized poster <em>designing</em></>} description="Turn your special moments into beautiful memories with a visual made around your people, words, colours and occasion." image={posterDesign} previewItem={portfolio[0]} onPreview={setSelected} bullets={['Birthday & surprise posters', 'Wedding & engagement posters', 'Business & advertisement posters', 'Festival, event, memory and invitation designs', 'Visiting card creating']} cta="Create my poster" message="Hi Happy Moments, I am interested in customized poster designing." />
      <DetailSection id="gifts" eyebrow="Made to be held onto" title={<>Arts & <em>gifts</em></>} description="A portrait, frame or tiny charm can carry an entire feeling. Choose a handmade direction for the person who means something." image={artGifts} previewItem={portfolio[1]} onPreview={setSelected} bullets={['Pencil sketch portraits and colour drawings', 'Cartoon portraits and custom art for gifts', 'Photo frames, keychains and mobile charms', 'Resin keychains, covers, miniatures and personalized gifts']} cta="Plan a personalized gift" message="Hi Happy Moments, I am interested in personalized gifts." dark reverse />
      <DetailSection id="banners" eyebrow="Make an entrance" title={<>Banner making & <em>flex designing</em></>} description="Bold designs. Big impact. Maximum attention. Bring your business, shop, event, school or launch into view." image={bannerDesign} previewItem={portfolio[2]} onPreview={setSelected} bullets={['Business and shop / store banners', 'Event and function banners', 'School / college banners', 'Product launch and grand opening banners']} cta="Create a banner like this" message="Hi Happy Moments, I need a banner/flex design." />
      <DetailSection id="events" eyebrow="The room, reimagined" title={<>Event <em>management</em></>} description="We plan. You celebrate. We make it unforgettable. Share the feeling you want the room to hold, and we’ll help take care of the rest." image={events} previewItem={portfolio[3]} onPreview={setSelected} bullets={['Birthday party arrangements', 'Engagement, wedding and anniversary celebrations', 'Corporate and school / college events', 'Festival occasions, themes, catering, entertainment, photography and MC']} cta="Plan my event" message="Hi Happy Moments, I need event management." dark />

      <section className="section-pad" id="additional" aria-labelledby="additional-title"><div className="section-wrap"><div className="portfolio-head"><div><span className="eyebrow">Extra services. Extra impact.</span><h2 className="section-heading" id="additional-title">The details that <em>carry</em> your brand.</h2></div><p className="lead">From a thank-you card to a reel that catches attention, keep every touchpoint in the same thoughtful visual world.</p></div><div className="split-card" style={{ marginTop: '2.3rem' }}><div><button onClick={() => setSelected(portfolio[4])} style={{ border: 0, padding: 0, background: 'none', width: '100%', cursor: 'pointer' }} aria-label="Open additional services preview" data-testid="button-preview-additional"><img className="showcase-img" src={additionalServices} alt="Additional Happy Moments design services" loading="lazy" /></button></div><div><ul className="bullet-list">{['Social media post design', 'Social media reels editing', 'Flyer / pamphlet design', 'Menu card design', 'Thank you cards', 'Visiting cards', 'Certificate design'].map((x) => <li key={x}><Check size={16} />{x}</li>)}</ul><WhatsAppButton message="Hi Happy Moments, I need additional design services.">Ask about additional services <ArrowRight size={15} /></WhatsAppButton></div></div></div></section>

      <section className="section-pad dark-section" id="instagram" aria-labelledby="instagram-title"><div className="section-wrap feature-layout"><div className="feature-copy"><span className="eyebrow">Your social media. Our expertise.</span><h2 className="section-heading" id="instagram-title">Instagram account <em>handling</em></h2><p className="lead">Build a consistent presence with content that sounds like you and looks ready to be remembered.</p><div className="pill-list">{['Content planning & creation', 'Post scheduling', 'Story & reel management', 'Engagement with followers', 'Performance tracking & reports'].map((x) => <span className="pill" key={x}>{x}</span>)}</div><div className="section-actions"><WhatsAppButton message="Hi Happy Moments, I am interested in Instagram account handling.">Manage my Instagram</WhatsAppButton><a className="ghost-btn" href={instagramUrl} target="_blank" rel="noreferrer" data-testid="link-instagram"><Instagram size={16} /> Follow us</a></div></div><button className="art-frame wide-art" style={{ '--tilt': '-2deg' } as React.CSSProperties} onClick={() => setSelected(portfolio.find((item) => item.id === 'instagram')!)} data-testid="button-instagram-preview"><img src={instagramHandling} alt="Instagram account handling service preview" /><div className="art-caption">More reach • More engagement • More growth</div></button></div></section>

      <DetailSection id="website" eyebrow="A home for your brand" title={<>Customized website <em>designing</em></>} description="Build your online presence the right way with a creative, mobile-responsive and user-friendly website." image={websiteDesign} previewItem={portfolio[6]} onPreview={setSelected} bullets={['Custom website design and responsive design', 'Modern user-friendly layouts', 'SEO-friendly structure', 'Domain & hosting setup', 'Website maintenance & support']} cta="Build my website" message="Hi Happy Moments, I am interested in website designing." dark reverse />

      <section className="study-section section-pad" id="study" aria-labelledby="study-title"><div className="section-wrap study-card"><div><span className="eyebrow">Academic support, thoughtfully arranged</span><h2 className="section-heading" id="study-title">Study <em>Craft</em></h2><p className="lead">Enhance your academic success with organized, presentation-focused support.</p><ul className="bullet-list">{['Typing', 'Assignments', 'Projects', 'Reports', 'PPTs', 'Format, Formulas & One Work Document'].map((x) => <li key={x}><Check size={16} />{x}</li>)}</ul><p style={{ color: '#5b326b', fontWeight: 700, fontSize: '.86rem' }}>PDFs for 11th & 12th only</p><div className="study-categories">{['Format PDF', 'Formulas PDF', 'Done Work Document PDF'].map((x) => <div className="study-cat" key={x}>{x}</div>)}</div><div style={{ marginTop: '1.5rem' }}><WhatsAppButton message="Hi Happy Moments, I need information about Study Craft services.">Get study support <ArrowRight size={15} /></WhatsAppButton></div></div><button className="qr-card" onClick={() => setSelected(portfolio.find((item) => item.id === 'study')!)} data-testid="button-study-preview"><img src={studyCraft} alt="Study Craft academic support poster" loading="lazy" /><span className="text-link" style={{ justifyContent: 'center' }}>View Study Craft <ExternalLink size={14} /></span></button></div></section>

      <section className="video-section section-pad" id="videos" aria-labelledby="videos-title"><div className="section-wrap"><span className="eyebrow">Capture • Create • Cherish</span><h2 className="section-heading" id="videos-title">Your story, our <em>creativity.</em></h2><p className="lead">Customized edits for birthdays, weddings, anniversaries, invitations, brands and photo-plus-song memories.</p><div className="video-grid"><button className="video-tile" onClick={() => setSelected(portfolio.find((x) => x.id === 'video')!)} data-testid="button-video-featured"><img src={videoCreation} alt="Customized video creation preview" loading="lazy" /><span className="play"><Play size={20} fill="currentColor" /></span><h3>Customized video creation</h3></button></div><div style={{ marginTop: '2rem' }}><WhatsAppButton message="Hi Happy Moments, I need a customized video.">Create my video <ArrowRight size={15} /></WhatsAppButton></div></div></section>

      <section className="portfolio-section section-pad" id="portfolio" aria-labelledby="portfolio-title"><div className="section-wrap"><div className="portfolio-head"><div><span className="eyebrow">The digital keepsake box</span><h2 className="section-heading" id="portfolio-title">Our <em>creations.</em></h2></div><p className="lead">Every print is a doorway. Open one to see the story, then make it your own.</p></div><div className="filter-row" role="tablist" aria-label="Portfolio categories">{filters.map((item) => <button className={`filter-btn ${filter === item ? 'active' : ''}`} key={item} onClick={() => setFilter(item)} role="tab" aria-selected={filter === item} data-testid={`button-filter-${item.toLowerCase().replace(/[^a-z]+/g, '-')}`}>{item}</button>)}</div><div className="portfolio-grid">{visiblePortfolio.map((item) => <PortfolioCard key={item.id} item={item} onOpen={setSelected} />)}</div></div></section>

      <section className="contact-section section-pad" id="contact" aria-labelledby="contact-title"><div className="section-wrap contact-grid"><div><span className="eyebrow">A lovely place to begin</span><h2 className="section-heading" id="contact-title">Let’s create something <em>amazing together.</em></h2><p className="lead">Share your idea, photos, requirements or existing design. We’ll create something special for you.</p><div className="contact-details"><a className="contact-item" href="tel:+919444789973" data-testid="link-phone"><Phone size={19} /><span><small>WhatsApp / phone</small><strong>+91 94447 89973</strong></span></a><a className="contact-item" href="mailto:happymoments0826@gmail.com" data-testid="link-email"><Mail size={19} /><span><small>Email</small><strong>happymoments0826@gmail.com</strong></span></a><a className="contact-item" href={instagramUrl} target="_blank" rel="noreferrer" data-testid="link-contact-instagram"><Instagram size={19} /><span><small>Instagram</small><strong>Happy_Moments_135</strong></span></a><a className="contact-item" href={mapUrl} target="_blank" rel="noreferrer" data-testid="link-location"><MapPin size={19} /><span><small>Studio address</small><strong>B2, Jumbo Square 62 & 63<br />Venkatesa Perumal 2nd Street<br />Madipakkam, Chennai 600092</strong></span></a></div></div><div className="contact-panel"><a href={instagramUrl} target="_blank" rel="noreferrer" data-testid="link-contact-qr"><img src={contactArtwork} alt="Scan to follow Happy_Moments_135 on Instagram" loading="lazy" /></a><h3>Bring us your idea.</h3><p className="lead">One message is enough to start the conversation.</p><div className="section-actions"><WhatsAppButton message="Hi Happy Moments, I would like to share my idea and discuss a customized creation.">Start on WhatsApp</WhatsAppButton><a className="ghost-btn" href={instagramUrl} target="_blank" rel="noreferrer" data-testid="link-follow-contact"><Instagram size={16} /> Scan / follow</a></div></div></div></section>

      <footer className="footer"><div className="section-wrap footer-grid"><div><div className="footer-brand">Happy Moments</div><p className="footer-note">Create • Celebrate • Remember</p><p style={{ fontSize: '.8rem', lineHeight: 1.7, maxWidth: '17rem' }}>Your moments have a story. Let us turn it into something you’ll treasure forever.</p></div><div><h4>Explore</h4>{navItems.slice(0, 5).map(([label, id]) => <a key={id} href={`#${id}`} data-testid={`link-footer-${id}`}>{label}</a>)}</div><div><h4>Services</h4>{['Posters', 'Arts & Gifts', 'Banners', 'Events', 'Website Design', 'Study Craft'].map((label) => <a key={label} href="#services">{label}</a>)}</div><div><h4>Connect</h4><a href="tel:+919444789973">+91 94447 89973</a><a href="mailto:happymoments0826@gmail.com">happymoments0826@gmail.com</a><a href={instagramUrl} target="_blank" rel="noreferrer">Happy_Moments_135</a><WhatsAppButton message="Hi Happy Moments, I would like to share my idea." className="ghost-btn">Let’s talk <Send size={14} /></WhatsAppButton></div></div><div className="section-wrap footer-bottom"><span>© Happy Moments · Madipakkam, Chennai</span><span>Made for memories worth keeping.</span></div></footer>
      <button className="floating-wa" onClick={() => whatsapp('Hi Happy Moments, I would like to share an idea.')} aria-label="Chat with Happy Moments on WhatsApp" data-testid="button-floating-whatsapp"><MessageCircle size={23} /></button>
      {selected && <PortfolioModal item={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}
function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}
function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}
export default App;