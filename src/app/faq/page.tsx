import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { getFAQ } from "@/lib/data"

export default function FAQPage() {
  const faq = getFAQ()

  return (
    <div className="min-h-dvh bg-gradient-to-b from-warm-cream to-sage/20 px-6 py-8">
      <div className="mx-auto max-w-lg">
        <div className="text-center mb-8">
          <h1 className="font-heading text-2xl text-jungle-deep">FAQ</h1>
          <p className="text-xs text-moss font-sans mt-1">Pertanyaan umum seputar PKKMB</p>
        </div>

        <Accordion className="space-y-3">
          {faq.map((item) => (
            <AccordionItem key={item.id} value={`faq-${item.id}`}>
              <AccordionTrigger className="text-sm font-sans text-jungle-deep">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-moss font-sans leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
