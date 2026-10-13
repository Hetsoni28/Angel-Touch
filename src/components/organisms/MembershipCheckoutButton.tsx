'use client'

import { useState } from 'react'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/atoms/Button'
import { Lock, AlertCircle, CheckCircle2, Clock } from 'lucide-react'
import Link from 'next/link'

interface MembershipCheckoutButtonProps {
  planId: string
  amount: number
  disabled?: boolean
}

export function MembershipCheckoutButton({ planId, amount, disabled }: MembershipCheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleCheckout = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // 1. Call our separated Membership API
      const response = await fetch('/api/payments/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sanityPlanId: planId }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to initialize checkout')
      }

      // 2. Open Razorpay Widget
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Use public key from env
        amount: result.data.amount,
        currency: result.data.currency,
        name: 'Angel Touch',
        description: 'Premium Membership',
        order_id: result.data.id,
        handler: async function (response: any) {
          try {
            // Server-side payment verification
            const verifyRes = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                type: 'membership',
                referenceId: planId,
              }),
            })
            const verifyData = await verifyRes.json()
            if (!verifyRes.ok) {
              throw new Error(verifyData.error || 'Payment verification failed.')
            }
            router.push('/customer/dashboard?success=membership')
          } catch (err: any) {
            setError(err.message || 'Payment verification failed.')
          } finally {
            setIsLoading(false)
          }
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false)
            setError('Payment Cancelled: The checkout window was closed before completing payment.')
          },
        },
        prefill: {},
        theme: {
          color: '#1e2228',
        },
      }

      const rzp = new (window as any).Razorpay(options)
      
      rzp.on('payment.failed', function (response: any) {
        setIsLoading(false)
        const reason = response.error?.description || 'Your transaction was declined by the bank.'
        setError(`Payment Failed: ${reason} Your card was not charged. Please try again or use another payment method.`)
      })

      rzp.open()
      
    } catch (err: any) {
      setError(err.message || 'An error occurred during checkout.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      {error && (() => {
        const isCancelled = error.startsWith('Payment Cancelled')
        const isDelayed = error.toLowerCase().includes('delayed') || error.toLowerCase().includes('pending')
        const isAlreadyActive = error.toLowerCase().includes('active membership')

        if (isCancelled) {
          return (
            <div className="bg-[#faf8f2] border-l-2 border-[#edc179] p-4 mb-4 text-left">
              <div className="flex items-start gap-3 text-[#735118]">
                <Clock className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#b38538]" />
                <div>
                  <p className="text-[13px] font-medium leading-relaxed">{error}</p>
                  <p className="text-[11px] text-[#8a8d87] mt-1">You can subscribe whenever you are ready.</p>
                </div>
              </div>
            </div>
          )
        }

        if (isDelayed) {
          return (
            <div className="bg-[#faf8f2] border-l-2 border-[#edc179] p-4 mb-4 text-left">
              <div className="flex items-start gap-3 text-[#735118]">
                <Clock className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#b38538]" />
                <div>
                  <p className="text-[13px] font-medium leading-relaxed">{error}</p>
                  <p className="text-[11px] text-[#8a8d87] mt-1">Please avoid paying twice; your membership will activate upon bank clearance.</p>
                </div>
              </div>
            </div>
          )
        }

        if (isAlreadyActive) {
          return (
            <div className="bg-[#f0f9f0] border-l-2 border-[#2e7a3a] p-4 mb-4 text-left">
              <div className="flex items-start gap-3 text-[#1e5f2e]">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#2e7a3a]" />
                <div>
                  <p className="text-[13px] font-medium leading-relaxed">{error}</p>
                  <div className="mt-2 flex gap-4">
                    <Link href="/customer/library" className="text-[11px] font-bold text-[#2e7a3a] uppercase tracking-wider hover:underline">
                      Explore Library &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        }

        return (
          <div className="bg-[#fef2f2] border-l-2 border-red-500 p-4 mb-4 text-left flex flex-col gap-2">
            <div className="flex items-start gap-3 text-red-700">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p className="text-[13px] leading-relaxed font-medium">{error}</p>
            </div>
            <div className="pl-7 pt-1">
              <a
                href="https://wa.me/919723179638?text=Hello%2C%20I%20encountered%20an%20issue%20during%20membership%20checkout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold text-[#8a8d87] hover:text-[#2e7a3a] uppercase tracking-wider transition-colors"
              >
                Need concierge assistance? Contact WhatsApp concierge &rarr;
              </a>
            </div>
          </div>
        )
      })()}

      <Button 
        onClick={handleCheckout} 
        disabled={isLoading || disabled}
        className="w-full bg-[#1e2228] hover:bg-[#2e7a3a] text-white py-4 mt-2 text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
            Processing...
          </span>
        ) : (
          <span className="flex items-center justify-center">
            <Lock className="w-4 h-4 mr-2" /> Subscribe for ₹{amount}
          </span>
        )}
      </Button>
    </div>
  )
}
