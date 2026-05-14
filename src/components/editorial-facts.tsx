"use client";

import { motion } from "framer-motion";

const facts = [
  {
    n: "01",
    title: "Primeiro contrato antes de qualquer credencial.",
    body: "O primeiro sistema municipal surgiu antes de qualquer formalidade — sem empresa registrada, sem capital externo. Veio da qualidade do trabalho, não do currículo.",
  },
  {
    n: "02",
    title: "Bootstrap desde o início.",
    body: "Zero capital externo captado. Cada contrato financiou o próximo. Em produção: R$2,98bi em políticas culturais geridas, plataformas ativas em gestão pública, saúde e mobilidade.",
  },
  {
    n: "03",
    title: "Nordeste como escolha.",
    body: "Base em Maceió. Clientes em municípios do interior de Alagoas. Tecnologia de excelência não é privilégio do eixo SP-RJ — é uma questão de onde você decide construir.",
  },
  {
    n: "04",
    title: "Produto e pesquisa juntos.",
    body: "4 papers publicados em conferências internacionais (DGO, SBCAS). Pipeline ativo para SBES 2026, SBCAS 2026 e IEEE Access. Código e ciência se alimentam.",
  },
];

export function EditorialFacts() {
  return (
    <section
      className="section-outer"
    >
      <div className="max-w-[1440px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="font-mono text-[11px] tracking-[0.2em] uppercase text-foreground/60 mb-12"
        >
          Contexto
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border/40 rounded-xl overflow-hidden">
          {facts.map(({ n, title, body }, i) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                delay: i * 0.08,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
              }}
              className="bg-void p-6 flex flex-col gap-3"
            >
              <span className="font-mono text-[11px] text-primary tracking-widest">
                #{n}
              </span>
              <h3 className="font-headline font-bold text-fg-bright text-[15px] leading-snug tracking-[-0.01em]">
                {title}
              </h3>
              <p className="text-[13px] text-foreground/75 leading-relaxed">
                {body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
