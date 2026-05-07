import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidade — Confecção Café do Brasil',
  description: 'Saiba como tratamos seus dados pessoais de acordo com a LGPD.',
}

export default function PrivacidadePage() {
  return (
    <main className="bg-[#F7F3EE] min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-28">
        <p className="text-[#C8A96E] text-xs tracking-[0.3em] uppercase font-sans mb-4">Legal</p>
        <h1 className="font-serif text-4xl font-bold text-[#2C1A0E] mb-2">Política de Privacidade</h1>
        <p className="text-[#999] text-sm font-sans mb-12">Última atualização: 1 de maio de 2025</p>

        <div className="flex flex-col gap-10 font-sans text-[#444] text-base leading-relaxed">
          {[
            {
              title: '1. Quem somos',
              body: 'Confecção Café do Brasil LTDA, CNPJ 00.000.000/0001-00, com sede em Poços de Caldas — MG, é a controladora dos dados pessoais coletados neste site.',
            },
            {
              title: '2. Dados que coletamos',
              body: 'Coletamos nome completo, e-mail, telefone, CPF e endereço para processamento de pedidos. Podemos coletar dados de navegação (cookies, endereço IP) para melhoria da experiência e análise de desempenho.',
            },
            {
              title: '3. Como usamos seus dados',
              body: 'Seus dados são usados para: (a) processar e entregar seus pedidos; (b) enviar confirmações de compra e atualizações de envio por e-mail; (c) cumprir obrigações legais e fiscais; (d) com seu consentimento, enviar comunicações de marketing.',
            },
            {
              title: '4. Compartilhamento de dados',
              body: 'Compartilhamos dados estritamente necessários com: InfinitePay (processador de pagamento), Melhor Envio (logística de frete) e Supabase (hospedagem de banco de dados). Nenhum dado é vendido a terceiros.',
            },
            {
              title: '5. Cookies e Meta Pixel',
              body: 'Utilizamos cookies de sessão e o Meta Pixel do Facebook para medir a efetividade de anúncios. Você pode desativar cookies no seu navegador. O Meta Pixel é ativado apenas se você não estiver em modo de privacidade.',
            },
            {
              title: '6. Seus direitos (LGPD)',
              body: 'Conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018), você tem direito a: acesso, correção, exclusão, portabilidade e revogação de consentimento a qualquer tempo. Envie sua solicitação para oi@confeccaocafebrasil.com.br.',
            },
            {
              title: '7. Retenção de dados',
              body: 'Mantemos dados de pedidos por 5 anos para fins fiscais e legais. Dados de marketing são excluídos mediante solicitação.',
            },
            {
              title: '8. Contato do DPO',
              body: 'Para questões sobre privacidade: privacidade@confeccaocafebrasil.com.br.',
            },
          ].map((s) => (
            <div key={s.title}>
              <h2 className="font-serif text-xl font-bold text-[#2C1A0E] mb-3">{s.title}</h2>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
