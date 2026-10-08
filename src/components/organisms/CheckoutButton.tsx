'use client'

import { useState } from 'react'
import { Button } from '@/components/atoms/Button'
import { useRouter } from 'next/navigation'
import Script from 'next/script'
import { CheckCircle2, AlertCircle } from 'lucide-react'

interface CheckoutButtonProps {
  classId: string
  classTitle: string
  amount: number
  userId: string
  userEmail: string
  userName: string
}

export function CheckoutButton({ classId, classTitle, amount, userId, userEmail, userName }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handlePayment = async () => {
    try {
      setLoading(true)
      setError(null)

      // 1. Create Pending Enrollment
      const enrollRes = await fetch('/api/classes/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ classId })
      })
      const enrollData = await enrollRes.json()
      
      if (!enrollRes.ok) {
        throw new Error(enrollData.error || 'Failed to create enrollment')
      }

      const enrollmentId = enrollData.data.enrollmentId

      // 2. Create Razorpay Order
      const orderRes = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'class_enrollment',
          referenceId: enrollmentId,
        })
      })
      const orderData = await orderRes.json()

      if (!orderRes.ok) {
        throw new Error(orderData.error || 'Failed to initialize payment')
      }

      const { orderId, amount: trueAmount, currency, razorpayKeyId } = orderData.data

      // 3. Open Razorpay Modal
      const options = {
        key: razorpayKeyId,
        amount: trueAmount,
        currency,
        name: 'Angel Touch',
        description: `Enrollment: ${classTitle}`,
        order_id: orderId,
        handler: function (response: any) {
          // Razorpay successful payment callback
          // The webhook handles actual database confirmation.
          setSuccess(true)
          // Redirect to dashboard after a short delay
          setTimeout(() => {
            router.push('/customer/dashboard')
          }, 3000)
        },
        prefill: {
          name: userName,
          email: userEmail,
        },
        theme: {
          color: '#2e7a3a'
        }
      }

      // @ts-ignore
      const rzp = new window.Razorpay(options)
      rzp.on('payment.failed', function (response: any) {
        setError('Payment was declined or failed. Please try again.')
      })
      rzp.open()

    } catch (err: any) {
      setError(err.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="bg-[#e9f3e9] text-[#1e5f2e] p-6 rounded-lg flex flex-col items-center justify-center text-center">
        <CheckCircle2 className="w-12 h-12 mb-4" />
        <h3 className="text-lg font-playfair font-semibold mb-2">Payment Successful!</h3>
        <p className="text-sm">Your enrollment is confirmed. Redirecting to your dashboard...</p>
      </div>
    )
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      {error && (
        <div className="bg-red-50 text-red-700 p-4 mb-6 rounded flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <Button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-[#1e2228] hover:bg-[#2e7a3a] text-white py-4 rounded-none text-xs font-semibold tracking-widest uppercase transition-colors"
      >
        {loading ? 'Initializing Secure Checkout...' : `Pay ₹${amount} Securely`}
      </Button>
    </>
  )
}
