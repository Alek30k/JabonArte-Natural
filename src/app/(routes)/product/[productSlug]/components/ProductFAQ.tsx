"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ProductFAQ = () => {
  const faqs = [
    {
      question: "¿Los jabones son realmente 100% naturales?",
      answer:
        "Sí, todos nuestros jabones están elaborados únicamente con ingredientes naturales y orgánicos. No utilizamos químicos sintéticos, parabenos, sulfatos ni conservantes artificiales.",
    },
    {
      question: "¿Cuánto tiempo dura un jabón?",
      answer:
        "En promedio, un jabón de 100g dura entre 4 a 6 semanas con uso diario, dependiendo de la frecuencia de uso y las condiciones de almacenamiento.",
    },
    {
      question: "¿Son aptos para pieles sensibles?",
      answer:
        "Absolutamente. Nuestros jabones están formulados especialmente para ser suaves con todo tipo de piel, incluyendo pieles sensibles y delicadas.",
    },
    {
      question: "¿Cómo debo conservar el jabón?",
      answer:
        "Para maximizar la duración, mantén el jabón en un lugar seco entre usos, preferiblemente en una jabonera con drenaje. Evita la exposición directa al sol y almacénalo en un lugar fresco y ventilado.",
    },
    {
      question: "¿Hacen envíos a todo el país?",
      answer:
        "Sí, realizamos envíos a toda Argentina. El envío es gratuito para compras superiores a $15.000. Los tiempos de entrega varían según la ubicación.",
    },
    {
      question: "¿Puedo personalizar los jabones?",
      answer:
        "¡Por supuesto! Ofrecemos servicios de personalización para eventos, regalos empresariales y ocasiones especiales. Puedes elegir colores, aromas y hasta el packaging.",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preguntas Frecuentes</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default ProductFAQ;
