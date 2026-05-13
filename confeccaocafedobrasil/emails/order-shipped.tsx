import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { OrderEmailData } from '@/lib/email'

interface Props {
  order: OrderEmailData & { trackingCode: string; estimatedDelivery?: string }
}

export function OrderShippedEmail({ order }: Props) {
  const appUrl = 'https://confeccaocafebrasil.com.br'

  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>Sua bolsa está a caminho! 🚚 Rastreie agora.</Preview>
      <Body style={{ backgroundColor: '#F7F3EE', fontFamily: 'Georgia, serif', margin: 0, padding: 0 }}>
        <Container style={{ maxWidth: 600, margin: '0 auto', padding: '40px 20px' }}>

          {/* Header */}
          <Section style={{ backgroundColor: '#3B5249', borderRadius: 8, padding: '32px 40px', textAlign: 'center' }}>
            <Text style={{ color: '#C8A96E', fontSize: 13, letterSpacing: 4, textTransform: 'uppercase', margin: 0 }}>
              Confecção Café do Brasil
            </Text>
            <Heading style={{ color: '#F7F3EE', fontSize: 26, fontWeight: 700, margin: '12px 0 0' }}>
              Partiu! 🚚
            </Heading>
            <Text style={{ color: '#B0C4B1', fontSize: 15, margin: '8px 0 0', fontFamily: 'sans-serif' }}>
              Seu pedido foi enviado e está a caminho.
            </Text>
          </Section>

          {/* Greeting */}
          <Section style={{ padding: '32px 0 0' }}>
            <Text style={{ fontSize: 17, color: '#2C1A0E', lineHeight: 1.6, margin: 0 }}>
              Olá, <strong>{order.customerName}</strong>!
            </Text>
            <Text style={{ fontSize: 15, color: '#555', lineHeight: 1.7, marginTop: 8 }}>
              Sua <strong>{order.items[0]?.name ?? 'bolsa'}</strong> saiu com carinho das nossas mãos
              e já está em rota de entrega para você.
            </Text>
          </Section>

          <Hr style={{ borderColor: '#E5DDD5', margin: '24px 0' }} />

          {/* Tracking */}
          <Section style={{ backgroundColor: '#fff', borderRadius: 8, padding: '24px 28px', border: '1px solid #E5DDD5' }}>
            <Text style={{ fontSize: 13, color: '#8B7355', letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'sans-serif', margin: '0 0 8px' }}>
              Código de Rastreio
            </Text>
            <Text style={{ fontSize: 22, color: '#2C1A0E', fontFamily: 'monospace', fontWeight: 700, margin: 0, letterSpacing: 2 }}>
              {order.trackingCode}
            </Text>
            {order.estimatedDelivery && (
              <Text style={{ fontSize: 13, color: '#888', margin: '8px 0 0', fontFamily: 'sans-serif' }}>
                Previsão de entrega: {order.estimatedDelivery}
              </Text>
            )}
          </Section>

          <Hr style={{ borderColor: '#E5DDD5', margin: '28px 0' }} />

          {/* CTA */}
          <Section style={{ textAlign: 'center' }}>
            <Button
              href={`${appUrl}/pedido/${order.id}`}
              style={{
                backgroundColor: '#3B5249',
                color: '#F7F3EE',
                borderRadius: 6,
                padding: '14px 32px',
                fontSize: 15,
                fontFamily: 'sans-serif',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Rastrear meu pedido →
            </Button>
          </Section>

          {/* Footer */}
          <Section style={{ textAlign: 'center', marginTop: 40 }}>
            <Text style={{ fontSize: 12, color: '#999', fontFamily: 'sans-serif', lineHeight: 1.7 }}>
              Confecção Café do Brasil · Poços de Caldas, MG
              <br />
              Cada saca de café tem uma história. Agora a sua também.
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  )
}

export default OrderShippedEmail
