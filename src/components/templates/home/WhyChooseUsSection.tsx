import { Leaf, ShieldCheck, BookOpen, Heart, Users, Star } from 'lucide-react'

export function WhyChooseUsSection() {
  const reasons = [
    { icon: Leaf, title: '100% Natural', description: 'No harsh chemicals. Every ingredient is natural, ethically sourced, and Ayurvedically approved.' },
    { icon: ShieldCheck, title: 'Expert Formulated', description: 'Each product and treatment is designed by a certified Ayurvedic practitioner with years of experience.' },
    { icon: BookOpen, title: 'Knowledge Sharing', description: 'We believe in empowering you — not just selling to you. Learn the art behind every product.' },
    { icon: Heart, title: 'Holistic Wellness', description: 'We address beauty, health, and wellness together — body, mind, and spirit in harmony.' },
    { icon: Users, title: 'Community', description: 'Join a growing community of women embracing natural living and Ayurvedic wisdom.' },
    { icon: Star, title: 'Trusted Quality', description: 'Loved by hundreds of customers who have transformed their beauty and wellness routines naturally.' },
  ]

  return (
    <section className="py-20 bg-ivory">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">Why Angel Touch</p>
          <h2 className="text-3xl md:text-4xl font-bold text-heading" style={{ fontFamily: 'var(--font-heading)' }}>
            The Angel Touch Difference
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {reasons.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex items-start gap-4 p-5 bg-white rounded-xl border border-border hover:shadow-sm transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center shrink-0">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-heading mb-1.5 text-sm">{title}</h3>
                <p className="text-xs text-body leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

