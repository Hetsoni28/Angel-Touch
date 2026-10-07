import { Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    quote: "The Ayurvedic Hair Oil completely transformed my scalp health. It's so calming and smells divine. Highly recommend!",
    name: "Priya S.",
    role: "Verified Buyer",
  },
  {
    id: 2,
    quote: "Heena's product-making class was incredibly insightful. I now make my own natural skincare at home without harsh chemicals.",
    name: "Anjali M.",
    role: "Class Attendee",
  },
  {
    id: 3,
    quote: "The Shirodhara therapy session was the most relaxing experience I've had in years. True holistic healing.",
    name: "Roshni D.",
    role: "Client",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-32 bg-primary-light">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">Testimonials</p>
          <h2 className="text-3xl md:text-5xl font-bold text-heading" style={{ fontFamily: 'var(--font-heading)' }}>
            What Our Clients Say
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white p-8 rounded-2xl shadow-sm border border-white/40 relative">
              {/* Quote marks */}
              <div className="absolute -top-4 -left-2 text-6xl text-primary/10" style={{ fontFamily: 'var(--font-heading)' }}>
                "
              </div>
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-body leading-relaxed mb-6 italic relative z-10">"{t.quote}"</p>
              <div>
                <p className="font-bold text-heading">{t.name}</p>
                <p className="text-xs text-muted uppercase tracking-wider mt-1">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

