'use client'

import { useState } from 'act' // React 19 / Turbopack standard
import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/atoms/Button'
import { Lock } from 'lucide-react'

interface MembershipCheckoutButtonProps {
  planId: string
  amount: number
  disabled?: boolean
}

export function MembershipCheckoutButton({ planId, amount, disabled }: MembershipCheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleCheckout = async () => {
    try {
      setIsLoading(true)

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
        order_id: result.data.id, // For true subscriptions this would be subscription_id
        handler: function (response: any) {
          // Razorpay returns razorpay_payment_id, razorpay_order_id, razorpay_signature
          // Our Webhook handles the actual database update.
          // We just redirect the user to a success screen.
          router.push('/customer/dashboard?success=membership')
        },
        prefill: {
          // You could pass user details here if available in context
        },
        theme: {
          color: '#1e2228',
        },
      }

      const rzp = new (window as any).Razorpay(options)
      
      rzp.on('payment.failed', function (response: any) {
        console.error('Payment Failed:', response.error)
        alert('Payment failed. Please try again.')
      })

      rzp.open()
      
    } catch (error: any) {
      console.error('Checkout error:', error)
      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button 
      onClick={handleCheckout} 
      disabled={isLoading || disabled}
      className="w-full bg-[#1e2228] hover:bg-[#2e7a3a] text-white py-4 mt-6 text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors"
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
  )
}
