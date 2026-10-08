import { client } from '@/sanity/lib/client'
import { MASTERCLASS_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { notFound, redirect } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { CheckoutButton } from '@/components/organisms/CheckoutButton'
import { DynamicBreadcrumbs } from '@/components/molecules/DynamicBreadcrumbs'

export const instant = false

interface Props {
  params: Promise<{ slug: string }>
}

export default async function CheckoutPage({ params }: Props) {
  const resolvedParams = await params
  const { slug } = resolvedParams

  // 1. Authenticate user
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Redirect to login if unauthenticated, returning to this page
  if (!user) {
    redirect(`/login?redirect=/classes/${slug}/checkout`)
  }

  // 2. Fetch User Profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email')
    .eq('id', user.id)
    .single()

  // 3. Fetch Masterclass from Sanity
  const masterclass = await client.fetch(MASTERCLASS_BY_SLUG_QUERY, { slug })

  if (!masterclass) {
    notFound()
  }

  return (
    <div className="min-h-[80vh] bg-[#faf8f2] py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        <div className="mb-12">
          <DynamicBreadcrumbs 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Classes', href: '/classes' },
              { label: masterclass.title, href: `/classes/${slug}` },
              { label: 'Checkout' }
            ]} 
          />
        </div>

        <div className="max-w-3xl mx-auto bg-white border border-[#dde7dd] p-8 md:p-12">
          <h1 className="font-playfair text-3xl md:text-4xl text-[#1e2228] mb-8 text-center">
            Secure Checkout
          </h1>

          <div className="flex flex-col md:flex-row gap-8 items-center border-b border-[#dde7dd] pb-8 mb-8">
            <div className="w-full md:w-1/3 aspect-[4/3] relative">
              <Image 
                src={masterclass.imageUrl} 
                alt={masterclass.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="font-playfair text-2xl text-[#1e2228] mb-2">{masterclass.title}</h2>
              <p className="text-[#5c5a58] text-sm leading-relaxed">
                {masterclass.shortDescription}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center mb-8">
            <span className="text-[#5c5a58] uppercase tracking-widest text-xs font-semibold">Total Due</span>
            <span className="font-playfair text-2xl text-[#1e2228]">₹{masterclass.price}</span>
          </div>

          <CheckoutButton 
            classId={masterclass._id}
            classTitle={masterclass.title}
            amount={masterclass.price}
            userId={user.id}
            userEmail={profile?.email || user.email || ''}
            userName={profile?.full_name || 'Valued Customer'}
          />

          <p className="text-center text-[#5c5a58] text-xs mt-6 uppercase tracking-wider">
            Secured by Razorpay • 100% Encrypted
          </p>
        </div>

      </div>
    </div>
  )
}
