'use client'

import { useState } from 'react'
import { Button } from '@/components/atoms/Button'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Script from 'next/script'
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react'

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
                type: 'class_enrollment',
                referenceId: enrollmentId,
              }),
            })
            const verifyData = await verifyRes.json()
            if (!verifyRes.ok) {
              throw new Error(verifyData.error || 'Payment verification failed.')
            }

            setSuccess(true)
            setTimeout(() => {
              router.push('/customer/dashboard')
            }, 2000)
          } catch (err: any) {
            setError(err.message || 'Payment verification failed.')
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false)
            setError('Payment Cancelled: You closed the checkout window before completing payment. You can retry whenever you are ready.')
          },
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
        setLoading(false)
        const reason = response.error?.description || 'Your transaction was declined by the bank.'
        setError(`Payment Failed: ${reason} Your card was not charged. Please try again or use another payment method.`)
      })
      rzp.open()

    } catch (err: any) {
      setError(err.message || 'Something went wrong during checkout.')
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
      
      {error && (() => {
        const isCancelled = error.startsWith('Payment Cancelled')
        const isDelayed = error.toLowerCase().includes('delayed') || error.toLowerCase().includes('pending')
        const isDuplicate = error.toLowerCase().includes('already')

        if (isCancelled) {
          return (
            <div className="bg-[#faf8f2] border-l-2 border-[#edc179] p-4 mb-6">
              <div className="flex items-start gap-3 text-[#735118]">
                <Clock className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#b38538]" />
                <div>
                  <p className="text-[13px] font-medium leading-relaxed">{error}</p>
                  <p className="text-[11px] text-[#8a8d87] mt-1">Click the button below whenever you are ready to retry.</p>
                </div>
              </div>
            </div>
          )
        }

        if (isDelayed) {
          return (
            <div className="bg-[#faf8f2] border-l-2 border-[#edc179] p-4 mb-6">
              <div className="flex items-start gap-3 text-[#735118]">
                <Clock className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#b38538]" />
                <div>
                  <p className="text-[13px] font-medium leading-relaxed">{error}</p>
                  <p className="text-[11px] text-[#8a8d87] mt-1">Please do not submit a second payment. Contact us if your status does not update within 15 minutes.</p>
                </div>
              </div>
            </div>
          )
        }

        if (isDuplicate) {
          return (
            <div className="bg-[#f0f9f0] border-l-2 border-[#2e7a3a] p-4 mb-6">
              <div className="flex items-start gap-3 text-[#1e5f2e]">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#2e7a3a]" />
                <div>
                  <p className="text-[13px] font-medium leading-relaxed">{error}</p>
                  <div className="mt-2">
                    <Link href="/customer/classes" className="text-[11px] font-bold text-[#2e7a3a] uppercase tracking-wider hover:underline">
                      View in My Classes &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        }

        return (
          <div className="bg-[#fef2f2] border-l-2 border-red-500 p-4 mb-6 flex flex-col gap-2">
            <div className="flex items-start gap-3 text-red-700">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p className="text-[13px] leading-relaxed font-medium">{error}</p>
            </div>
            <div className="pl-7 pt-1">
              <a
                href={`https://wa.me/919723179638?text=Hello%2C%20I%20encountered%20an%20issue%20during%20checkout%20for%20${encodeURIComponent(classTitle)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold text-[#8a8d87] hover:text-[#2e7a3a] uppercase tracking-wider transition-colors"
              >
                Need payment assistance? Contact WhatsApp concierge &rarr;
              </a>
            </div>
          </div>
        )
      })()}

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
