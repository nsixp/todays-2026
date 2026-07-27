"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { getFAQ } from "@/lib/data"

const faq = getFAQ()

export default function FAQPage() {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-warm-cream to-sage/20 pt-24 pb-20">
      <div className="mx-auto max-w-2xl px-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-jungle-deep/10 text-[10px] text-moss font-sans tracking-[0.2em] uppercase border border-fern-mist/40 mb-4">
            TODAYS 2026
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl text-jungle-deep leading-tight mb-3">
            FAQ
          </h1>
          <p className="text-sm text-moss font-sans max-w-md mx-auto leading-relaxed">
            Pertanyaan umum seputar PKKMB Telkom University Purwokerto.
          </p>
        </motion.div>

        {/* Accordion */}
        <Accordion className="space-y-3">
          {faq.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <AccordionItem
                value={`faq-${item.id}`}
                className="rounded-2xl border border-fern-mist/60 bg-white/60 overflow-hidden data-[state=open]:bg-white data-[state=open]:border-sunlit-gold/30 transition-all duration-300"
              >
                <AccordionTrigger className="flex items-center justify-between w-full px-5 py-4 text-left text-sm font-heading text-jungle-deep hover:no-underline hover:text-jungle-deep/80 transition-colors [&[data-state=open]>svg]:rotate-180">
                  <span className="pr-4">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5 text-sm text-moss font-sans leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
