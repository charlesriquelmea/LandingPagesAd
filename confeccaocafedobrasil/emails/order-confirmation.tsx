import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from '@react-email/components'
import type { OrderEmailData } from '@/lib/email'

interface Props {
  order: OrderEmailData
}

function formatPrice(cents: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100)
}

export function OrderConfirmationEmail({ order }: Props) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://confeccaocafebrasil.com.br'

  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>Pedido #{order.id} confirmado! Obrigada, {order.customerName}. ☕</Preview>
      <Body style={{ backgroundColor: '#F7F3EE', fontFamily: 'Georgia, serif', margin: 0, padding: 0 }}>
        <Container style={{ maxWidth: 600, margin: '0 auto', padding: '40px 20px' }}>

          {/* Header */}
          <Section style={{ backgroundColor: '#2C1A0E', borderRadius: 8, padding: '32px 40px', textAlign: 'center' }}>
            <Text style={{ color: '#C8A96E', fontSize: 13, letterSpacing: 4, textTransform: 'uppercase', margin: 0 }}>
              Confecção Café do Brasil
            </Text>
            <Heading style={{ color: '#F7F3EE', fontSize: 26, fontWeight: 700, margin: '12px 0 0' }}>
              Pedido Confirmado! ☕
            </Heading>
          </Section>

          {/* Greeting */}
          <Section style={{ padding: '32px 0 0' }}>
            <Text style={{ fontSize: 17, color: '#2C1A0E', lineHeight: 1.6, margin: 0 }}>
              Olá, <strong>{order.customerName}</strong>!
            </Text>
            <Text style={{ fontSize: 15, color: '#555', lineHeight: 1.7, marginTop: 8 }}>
              Recebemos seu pedido e ele está sendo preparado com todo o cuidado artesanal que merece.
              Em breve você receberá outro e-mail com o código de rastreio.
            </Text>
          </Section>

          <Hr style={{ borderColor: '#E5DDD5', margin: '24px 0' }} />

          {/* Order Items */}
          <Section>
            <Text style={{ fontSize: 13, color: '#8B7355', letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'sans-serif', margin: '0 0 16px' }}>
              Itens do Pedido
            </Text>
            {order.items.map((item, i) => (
              <Row key={i} style={{ marginBottom: 12 }}>
                <Column style={{ width: 40 }}>
                  <Text style={{ fontSize: 15, color: '#2C1A0E', margin: 0 }}>{item.quantity}×</Text>
                </Column>
                <Column>
                  <Text style={{ fontSize: 15, color: '#2C1A0E', margin: 0 }}>{item.name}</Text>
                </Column>
                <Column style={{ textAlign: 'right' }}>
                  <Text style={{ fontSize: 15, color: '#2C1A0E', margin: 0, fontWeight: 600 }}>
                    {formatPrice(item.unitPrice * item.quantity)}
                  </Text>
                </Column>
              </Row>
            ))}
          </Section>

          <Hr style={{ borderColor: '#E5DDD5', margin: '20px 0' }} />

          {/* Totals */}
          <Section>
            <Row style={{ marginBottom: 8 }}>
              <Column><Text style={{ fontSize: 14, color: '#666', margin: 0, fontFamily: 'sans-serif' }}>Subtotal</Text></Column>
              <Column style={{ textAlign: 'right' }}><Text style={{ fontSize: 14, color: '#666', margin: 0, fontFamily: 'sans-serif' }}>{formatPrice(order.subtotal)}</Text></Column>
            </Row>
            <Row style={{ marginBottom: 8 }}>
              <Column><Text style={{ fontSize: 14, color: '#666', margin: 0, fontFamily: 'sans-serif' }}>Frete</Text></Column>
              <Column style={{ textAlign: 'right' }}><Text style={{ fontSize: 14, color: '#666', margin: 0, fontFamily: 'sans-serif' }}>{formatPrice(order.shippingAmount)}</Text></Column>
            </Row>
            <Row>
              <Column><Text style={{ fontSize: 17, color: '#2C1A0E', margin: 0, fontWeight: 700 }}>Total</Text></Column>
              <Column style={{ textAlign: 'right' }}><Text style={{ fontSize: 17, color: '#3B5249', margin: 0, fontWeight: 700 }}>{formatPrice(order.totalAmount)}</Text></Column>
            </Row>
          </Section>

          <Hr style={{ borderColor: '#E5DDD5', margin: '20px 0' }} />

          {/* Delivery Address */}
          <Section>
            <Text style={{ fontSize: 13, color: '#8B7355', letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'sans-serif', margin: '0 0 8px' }}>
              Endereço de Entrega
            </Text>
            <Text style={{ fontSize: 14, color: '#555', lineHeight: 1.7, margin: 0, fontFamily: 'sans-serif' }}>
              {order.addressStreet}, {order.addressNumber}
              {order.addressComplement && ` — ${order.addressComplement}`}
              <br />
              {order.addressNeighborhood} — {order.addressCity}/{order.addressState}
              <br />
              CEP: {order.addressCep}
            </Text>
          </Section>

          <Hr style={{ borderColor: '#E5DDD5', margin: '28px 0' }} />

          {/* CTA */}
          <Section style={{ textAlign: 'center' }}>
            <Button
              href={`${appUrl}/pedido/${order.id}`}
              style={{
                backgroundColor: '#2C1A0E',
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
              Acompanhar meu pedido →
            </Button>
          </Section>

          {/* Footer */}
          <Section style={{ textAlign: 'center', marginTop: 40 }}>
            <Text style={{ fontSize: 12, color: '#999', fontFamily: 'sans-serif', lineHeight: 1.7 }}>
              Confecção Café do Brasil · Poços de Caldas, MG
              <br />
              Cada peça é única e feita à mão. Obrigada pela preferência.
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  )
}

export default OrderConfirmationEmail
