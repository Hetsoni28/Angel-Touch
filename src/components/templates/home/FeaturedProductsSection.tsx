import Link from 'next/link'
import { ArrowRight, Leaf } from 'lucide-react'
import { Button } from '@/components/atoms/Button'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/molecules/Card'

// TODO: Replace placeholder data with Sanity CMS query
const placeholderProducts = [
  { id: '1', name: 'Ayurvedic Hair Oil', category: 'Hair Care', description: 'A traditional blend of herbs and oils for nourishing scalp and hair.', slug: 'ayurvedic-hair-oil' },
  { id: '2', name: 'Kumkumadi Face Serum', category: 'Skin Care', description: 'Ancient Ayurvedic formula for brightening and glowing skin.', slug: 'kumkumadi-face-serum' },
  { id: '3', name: 'Herbal Body Scrub', category: 'Body Care', description: 'Natural exfoliant made with herbs, oatmeal, and essential oils.', slug: 'herbal-body-scrub' },
]

export function FeaturedProductsSection() {
  return (
    <section className="py-20 gradient-hero">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">Our Products</p>
            <h2 className="text-3xl md:text-4xl font-bold text-heading" style={{ fontFamily: 'var(--font-heading)' }}>
              Featured Products
            </h2>
          </div>
          <Link href="/shop">
            <Button variant="outline" size="sm" className="gap-1 shrink-0">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {placeholderProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow group">
              {/* Product Image placeholder */}
              <div className="h-56 relative overflow-hidden bg-primary-light">
                <img src={`https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&auto=format&fit=crop&q=80&sig=${product.id}`} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <CardHeader>
                <p className="text-xs text-muted uppercase tracking-wider">{product.category}</p>
                <CardTitle className="text-lg mt-1">{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-body line-clamp-2">{product.description}</p>
              </CardContent>
              <CardFooter className="justify-between">
                <Link href={`/shop/${product.slug}`}>
                  <Button variant="outline" size="sm">View Details</Button>
                </Link>
                <Link href={`/shop/${product.slug}#enquire`}>
                  <Button variant="primary" size="sm">Enquire Now</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

