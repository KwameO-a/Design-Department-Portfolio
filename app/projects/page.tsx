import ContentGrid from '../../components/ContentGrid';
import Footer from '../../components/Footer';
import Buildings from '../../components/Buildings';

const navItems = [
  { number: '01', label: 'About',    href: '/#about' },
  { number: '02', label: 'Services', href: '/#projects' },
  { number: '03', label: 'Studio',   href: '/projects' },
  { number: '04', label: 'Team',     href: '/#team' },
  { number: '04', label: 'Community +', href: '/Community' },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-black">
      <ContentGrid items={navItems} />
      <Buildings />
      <Footer />
    </main>
  );
}
