"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ChatCircleDots, Leaf, Question } from "@phosphor-icons/react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { getFAQ } from "@/lib/data"

const faq = getFAQ()

export default function FAQPage() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="faq-fielddesk-surface min-h-dvh pb-24 pt-24">
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <section className="grid min-h-[22rem] items-center gap-8 py-8 md:grid-cols-[1fr_0.65fr] md:py-10">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ember">
              Catatan bantuan
            </span>
            <h1 className="mt-4 max-w-2xl font-heading text-4xl leading-[1.02] text-jungle-deep sm:text-5xl lg:text-6xl">
              Tidak perlu tersesat untuk bertanya.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-moss sm:text-base">
              Temukan jawaban tentang aturan, atribut, quiz, dan kelompok PKKMB dalam satu tempat.
            </p>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.12, duration: reduceMotion ? 0 : 0.65 }}
            className="faq-note relative mx-auto hidden aspect-4/3 w-full max-w-64 items-center justify-center rounded-2xl border border-jungle-deep/15 bg-warm-cream sm:flex"
            aria-hidden="true"
          >
            <Question size={104} weight="thin" className="text-jungle-deep/70" />
            <Leaf size={32} weight="duotone" className="absolute right-[18%] top-[12%] rotate-24 text-sunlit-gold" />
            <span className="absolute bottom-5 left-6 font-heading text-4xl text-jungle-deep/12">
              {String(faq.length).padStart(2, "0")}
            </span>
          </motion.div>
        </section>

        <section className="grid gap-9 border-t border-jungle-deep/15 pt-8 md:grid-cols-[15rem_1fr] md:gap-12">
          <div className="md:sticky md:top-24 md:self-start">
            <div className="flex size-12 items-center justify-center rounded-full border border-jungle-deep/15 text-moss">
              <ChatCircleDots size={23} weight="duotone" />
            </div>
            <h2 className="mt-5 font-heading text-3xl leading-tight text-jungle-deep">Jawaban dari pos ranger</h2>
            <p className="mt-3 text-sm leading-relaxed text-moss">
              Buka pertanyaan yang paling dekat dengan kebutuhanmu.
            </p>
          </div>

          <Accordion className="space-y-2.5">
            {faq.map((item, index) => (
              <motion.div
                key={item.id}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: index * 0.045, duration: reduceMotion ? 0 : 0.4 }}
              >
                <AccordionItem
                  value={`faq-${item.id}`}
                  className={`faq-paper-note overflow-hidden rounded-2xl border border-jungle-deep/12 px-5 transition-colors data-open:border-sunlit-gold/60 data-open:pb-2 ${
                    index % 2 === 0 ? "bg-warm-cream/86" : "bg-sage/12"
                  }`}
                >
                  <AccordionTrigger className="flex w-full items-start justify-between gap-4 py-5 text-left font-heading text-xl leading-snug text-jungle-deep hover:no-underline">
                    <span className="flex items-start gap-4">
                      <span className="mt-1 shrink-0 font-heading text-sm text-ember">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{item.question}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-7 pl-10 pr-5 text-sm leading-relaxed text-moss">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </section>
      </main>
    </div>
  )
}
