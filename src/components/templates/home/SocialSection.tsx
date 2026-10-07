import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/atoms/Button'

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
)



export function SocialSection() {
  return (
    <section className="py-20 bg-white border-t border-border">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="max-w-xl text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <InstagramIcon className="h-5 w-5 text-accent" />
              <p className="text-sm font-medium text-primary uppercase tracking-widest">Follow Us</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Join Our Community on Instagram
            </h2>
            <p className="text-body leading-relaxed">
              Stay updated with daily Ayurvedic tips, new product launches, behind-the-scenes of our product-making classes, and natural wellness inspiration.
            </p>
          </div>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg" className="gap-2">
              @AngelTouchByHeena <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
        </div>

        {/* Instagram Grid Placeholder */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 md:mt-0">
          {[
            '1611077544346-bf5287f3b8b6',
            '1608248593858-a83eb5003551',
            '1556228578-0d85b1a4d571',
            '1608248543803-ba4f8c70ae0b'
          ].map((id, index) => (
            <a key={index} href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="aspect-square rounded-xl overflow-hidden group">
              <img src={`https://images.unsplash.com/photo-${id}?w=400&auto=format&fit=crop&q=80`} alt="Instagram post" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
