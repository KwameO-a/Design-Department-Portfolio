import Hero from '../components/Hero';
import ContentGrid from '../components/ContentGrid';
import About from '../components/About';
import Services from '../components/Services';
import Projects from '../components/Projects';
import Team from '../components/Team';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const contentItems = [
  { number: '01', label: 'About',    href: '#about' },
  { number: '02', label: 'Services', href: '#projects' },
  { number: '03', label: 'Studio', href: '/projects' }, // goes to the projects page
  { number: '04', label: 'Team',     href: '#team' },
  { number: '04', label: 'Community +', href: '/Community' },
];

export default function Home() { 
  return (
    <>
      <Hero />
      <ContentGrid items={contentItems} />
      <section id="about"><About /></section>
      <section id="services"><Services /></section>
      {/* If you now have a dedicated /projects page, you can remove this next line */}
      <section id="projects"><Projects /></section>
      <section id="team"><Team /></section>
      <section id="contact"><Contact /></section>
      <Footer />
    </>
  );
}
