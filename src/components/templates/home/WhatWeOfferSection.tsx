import Link from 'next/link'
import { ChevronRight, Sparkles, Heart, BookOpen } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/molecules/Card'

export function WhatWeOfferSection() {
  const offerings = [
    {
      icon: Sparkles,
      title: 'Ayurvedic Products',
      description: 'Handcrafted natural products made with traditional Ayurvedic recipes. From oils to skincare — pure, chemical-free, and effective.',
      href: '/shop',
      cta: 'Shop Now',
    },
    {
      icon: Heart,
      title: 'Healing Treatments',
      description: 'Experience traditional Ayurvedic therapies and personalised treatments designed to restore balance to your body and mind.',
      href: '/treatments',
      cta: 'View Treatments',
    },
    {
      icon: BookOpen,
      title: 'Product-Making Classes',
      description: 'Learn to make your own Ayurvedic products at home. Live classes with recording access — from beginners to advanced.',
      href: '/classes',
      cta: 'Browse Classes',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">What We Offer</p>
          <h2 className="text-3xl md:text-4xl font-bold text-heading" style={{ fontFamily: 'var(--font-heading)' }}>
            Your Complete Ayurvedic Journey
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offerings.map(({ icon: Icon, title, description, href, cta }) => (
            <Card key={title} className="hover:shadow-md transition-shadow group">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                  <Icon className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-xl">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-body text-sm leading-relaxed">{description}</p>
              </CardContent>
              <CardFooter>
                <Link href={href} className="flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all">
                  {cta} <ChevronRight className="h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

