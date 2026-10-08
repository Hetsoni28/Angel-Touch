import { ShieldCheck, Video, RefreshCcw } from 'lucide-react'

export function MembershipValueProps() {
  return (
    <section className="bg-white py-16 border-y border-[#dde7dd]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-[#faf8f2] rounded-full flex items-center justify-center mb-6">
              <Video className="w-6 h-6 text-[#2e7a3a]" />
            </div>
            <h3 className="font-playfair text-xl text-[#1e2228] mb-3">Unlimited Vault Access</h3>
            <p className="text-[#5c5a58] text-[14px]">
              Watch and re-watch every single past recorded masterclass instantly. 
              Learn to formulate creams, oils, and serums at your own pace.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-[#faf8f2] rounded-full flex items-center justify-center mb-6">
              <RefreshCcw className="w-6 h-6 text-[#2e7a3a]" />
            </div>
            <h3 className="font-playfair text-xl text-[#1e2228] mb-3">Continuously Growing</h3>
            <p className="text-[#5c5a58] text-[14px]">
              Whenever a new live class concludes, its recording is automatically added to the vault for you to enjoy.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-[#faf8f2] rounded-full flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6 text-[#2e7a3a]" />
            </div>
            <h3 className="font-playfair text-xl text-[#1e2228] mb-3">Cancel Anytime</h3>
            <p className="text-[#5c5a58] text-[14px]">
              No long-term commitments. Manage your subscription directly from your customer dashboard with one click.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
