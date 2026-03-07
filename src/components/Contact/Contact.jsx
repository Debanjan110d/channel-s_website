import { useRef, useState } from "react"
import emailjs from "@emailjs/browser"

export default function Contact() {
  const form = useRef()
  const [isSending, setIsSending] = useState(false)
  const [status, setStatus] = useState(null)

  const sendEmail = (e) => {
    e.preventDefault()

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  if (!serviceId || !templateId || !publicKey) {
    alert("Email service is not configured. Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your .env file.")
    return
  }

  setIsSending(true)

  emailjs
    .sendForm(
      serviceId,
      templateId,
      form.current,
      publicKey
    )
    .then(
      () => {
        setStatus({ type: "success", text: "Thanks for reaching out! Your message is on its way." })
      },
      () => {
        setStatus({ type: "error", text: "Message failed to send. Please try again in a moment." })
      }
    )
    .finally(() => {
      setIsSending(false)
      setTimeout(() => setStatus(null), 4000)
    })

    e.target.reset()
  }

  return (
    <>
      <div className="py-20 text-gray-200">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10">

          {/* LEFT SIDE */}
          <div className="rounded-2xl border border-white/10 bg-[#08142e]/55 backdrop-blur-md p-8 shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
            <h1 className="text-3xl text-white font-bold">
              Let's Connect
            </h1>

            <p className="text-gray-400 mt-4">
              Have a question, project idea, or collaboration?
              Send a message using the form.
            </p>

            <div className="mt-8 space-y-3 text-gray-400">
              <p>💻 GitHub: github.com/Debanjan110d</p>
              <p>📺 YouTube: Gamer's Code Lab</p>
              <p><a href="https://discord.gg/AaTaHPt8Se" target="_blank" rel="noreferrer">💬 Discord: discord.gg/AaTaHPt8Se</a></p>
            </div>
          </div>

          {/* FORM */}
          <form
            ref={form}
            onSubmit={sendEmail}
            className="rounded-2xl border border-white/10 bg-[#08142e]/55 backdrop-blur-md p-6 sm:p-8 shadow-[0_18px_50px_rgba(0,0,0,0.35)] flex flex-col gap-4"
          >

            <input
              type="text"
              name="user_name"
              placeholder="Full Name"
              required
              className="py-3 px-3 rounded-lg bg-[#0b1933]/70 border border-white/15 text-gray-100 placeholder:text-gray-400 focus:border-orange-500"
            />

            <input
              type="email"
              name="user_email"
              placeholder="Email"
              required
              className="py-3 px-3 rounded-lg bg-[#0b1933]/70 border border-white/15 text-gray-100 placeholder:text-gray-400 focus:border-orange-500"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              required
              className="py-3 px-3 rounded-lg bg-[#0b1933]/70 border border-white/15 text-gray-100 placeholder:text-gray-400 focus:border-orange-500"
            />

            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 py-3 rounded-lg font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isSending}
            >
              {isSending ? "Sending..." : "Send Message"}
            </button>

          </form>

        </div>
      </div>

      {status && (
        <div
          className={`fixed bottom-6 right-6 max-w-sm px-4 py-3 rounded-lg shadow-lg text-sm transition-transform duration-200 ${
            status.type === "success"
              ? "bg-emerald-900 text-emerald-100 border border-emerald-600"
              : "bg-rose-900 text-rose-100 border border-rose-600"
          }`}
          role="status"
          aria-live="polite"
        >
          {status.text}
        </div>
      )}
    </>
  )
}