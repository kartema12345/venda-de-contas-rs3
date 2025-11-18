import React, { useState } from 'react'

// RuneMarket - Single-file React component (Tailwind CSS)
// - Uso: cole esse arquivo em um projeto React (Vite/Next) com Tailwind
// - Observação legal: venda de contas pode violar os Termos de Service (TOS) do jogo (Jagex).
//   Exiba termos e assuma responsabilidade legal apropriada.

export default function RuneMarket() {
  const sampleAccounts = [
    {
      id: 'acct-001',
      title: 'Main 99+ Combat + Skilling',
      priceBRL: 1200,
      skills: '99 Attack, 99 Strength, 99 Defence, 120 Slayer',
      description:
        'Conta veteran com diversos itens e skills altos. Email verificado. Entrega por trade e troca de credenciais mediante verificação.',
      image: 'https://placehold.co/400x250?text=RS3+Account+1',
      seller: 'VendedorA',
      condition: 'Email verificado, 2FA desligado (após acordo com comprador)',
    },
    {
      id: 'acct-002',
      title: 'Skiller 120+ Farming & Herblore',
      priceBRL: 450,
      skills: '120 Farming, 99 Herblore, 99 Agility',
      description: 'Skiller ideal para quem quer começar com conteúdo PvM/Skilling concentrado.',
      image: 'https://placehold.co/400x250?text=RS3+Account+2',
      seller: 'LojaX',
      condition: 'Conta com email de recuperação, prova de propriedade disponível',
    },
  ]

  const [accounts] = useState(sampleAccounts)
  const [cart, setCart] = useState([])
  const [selected, setSelected] = useState(null)
  const [showCheckout, setShowCheckout] = useState(false)

  function addToCart(item) {
    setCart((c) => [...c, item])
  }

  function removeFromCart(id) {
    setCart((c) => c.filter((i) => i.id !== id))
  }

  function totalBRL() {
    return cart.reduce((s, it) => s + it.priceBRL, 0)
  }

  // MOCK checkout: in produção, envie dados ao backend para criar sessão Stripe / Pix / Mercado Pago
  function checkout() {
    // exemplo: POST /api/create-checkout-session { items: cart }
    alert(`Iniciando checkout: R$ ${totalBRL().toFixed(2)} (mock)`)
    setShowCheckout(false)
    setCart([])
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="max-w-6xl mx-auto flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold">RuneMarket</h1>
        <div className="flex gap-3 items-center">
          <div className="text-sm">Carrinho: {cart.length} itens</div>
          <button
            className="px-3 py-1 rounded bg-indigo-600 text-white text-sm"
            onClick={() => setShowCheckout(true)}
            disabled={cart.length === 0}
          >
            Checkout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {accounts.map((acct) => (
              <article key={acct.id} className="bg-white rounded p-4 shadow">
                <img src={acct.image} alt={acct.title} className="w-full h-40 object-cover rounded mb-3" />
                <h2 className="font-semibold text-lg">{acct.title}</h2>
                <p className="text-sm text-gray-600">{acct.skills}</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-xl font-bold">R$ {acct.priceBRL}</div>
                  <div className="flex gap-2">
                    <button
                      className="px-2 py-1 border rounded text-sm"
                      onClick={() => setSelected(acct)}
                    >
                      Ver
                    </button>
                    <button
                      className="px-2 py-1 bg-green-600 text-white rounded text-sm"
                      onClick={() => addToCart(acct)}
                    >
                      Comprar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="bg-white rounded p-4 shadow">
          <h3 className="font-semibold mb-2">Carrinho</h3>
          {cart.length === 0 ? (
            <p className="text-sm text-gray-600">Carrinho vazio.</p>
          ) : (
            <div className="space-y-2">
              {cart.map((it) => (
                <div key={it.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{it.title}</div>
                    <div className="text-xs text-gray-500">{it.seller}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div>R$ {it.priceBRL}</div>
                    <button
                      className="text-xs text-red-600"
                      onClick={() => removeFromCart(it.id)}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-3 border-t pt-3">
                <div className="flex justify-between font-semibold">Total: R$ {totalBRL().toFixed(2)}</div>
                <button
                  className="mt-3 w-full px-3 py-2 bg-indigo-600 text-white rounded"
                  onClick={() => setShowCheckout(true)}
                >
                  Finalizar compra
                </button>
              </div>
            </div>
          )}

          <div className="mt-4 text-xs text-gray-500">
            Segurança: verifique a reputação do vendedor antes de pagar. Leia os termos.
          </div>
        </aside>
      </main>

      {/* Modal visualização */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded max-w-xl w-full p-4">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold">{selected.title}</h3>
              <button className="text-gray-500" onClick={() => setSelected(null)}>Fechar</button>
            </div>
            <img src={selected.image} alt={selected.title} className="w-full h-48 object-cover rounded my-3" />
            <p className="text-sm text-gray-700">{selected.description}</p>
            <p className="mt-2 text-sm"><strong>Condição:</strong> {selected.condition}</p>
            <p className="mt-1 text-sm"><strong>Vendedor:</strong> {selected.seller}</p>
            <div className="mt-4 flex gap-2 justify-end">
              <button className="px-3 py-1 border rounded" onClick={() => setSelected(null)}>Cancelar</button>
              <button
                className="px-3 py-1 bg-green-600 text-white rounded"
                onClick={() => { addToCart(selected); setSelected(null) }}
              >
                Adicionar ao carrinho
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout modal (mock) */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded max-w-md w-full p-4">
            <h3 className="text-lg font-semibold mb-2">Checkout</h3>
            <p className="text-sm text-gray-600">Total: R$ {totalBRL().toFixed(2)}</p>
            <div className="mt-3 space-y-2">
              <label className="block text-xs">Nome completo</label>
              <input className="w-full border rounded p-2 text-sm" placeholder="Seu nome" />
              <label className="block text-xs">Email</label>
              <input className="w-full border rounded p-2 text-sm" placeholder="seu@exemplo.com" />
            </div>

            <div className="mt-4 flex gap-2 justify-end">
              <button className="px-3 py-1 border rounded" onClick={() => setShowCheckout(false)}>Cancelar</button>
              <button className="px-3 py-1 bg-indigo-600 text-white rounded" onClick={checkout}>Pagar (mock)</button>
            </div>

            <div className="mt-3 text-xs text-gray-500">
              Em produção, integre Stripe, MercadoPago, Pix ou pagar.me. Execute verificação anti-fraude antes de liberar credenciais.
            </div>
          </div>
        </div>
      )}

      <footer className="max-w-6xl mx-auto mt-8 text-xs text-gray-500">
        <div className="bg-white rounded p-3 shadow">
          <h4 className="font-semibold">Aviso legal & TOS</h4>
          <p className="mt-1">A venda de contas pode violar os Termos de Serviço do jogo. Este site é um exemplo técnico — ao usar, certifique-se de que você e os vendedores cumprem a legislação local e os termos do serviço do jogo. O operador do site deve implementar verificação de identidade, registro e política de chargeback/disputa.</p>
        </div>
      </footer>
    </div>
  )
}

/*
README rápido (instruções):
1) Crie um projeto React (Vite/Next). Instale Tailwind CSS.
2) Cole esse componente como src/App.jsx e importe no index.
3) Backend (recomendado): Node/Express com endpoints:
   - POST /api/listings -> criar nova conta (seller)
   - GET /api/listings -> listar
   - POST /api/create-checkout-session -> criar sessão Stripe / MercadoPago
   - POST /api/webhook -> webhook para confirmar pagamento e liberar credenciais
4) Segurança:
   - Armazene provas de propriedade (screenshots, emails) em local seguro
   - Use verificação KYC para vendedores acima de certo volume
   - Bloqueie usuários com chargeback frequente
   - Monitore logins e IPs
5) Pagamentos: Stripe (cartões), MercadoPago (BR), Pix (via gateway), PayPal (opcional)
6) Anti-fraude: integração com serviços de análise de fraude, verificação manual antes de liberar credenciais.
7) Deploy: Vercel/Netlify/Render para frontend; backend em Render/Heroku/AWS/Google Cloud.

Limitações & Recomendações legais:
- Leia os Termos de Serviço do jogo (Jagex) e consulte um advogado se for comercializar em escala.
- Tenha políticas claras de reembolso, disputa e prova de propriedade.
- Considere oferecer escrow (retentor) para segurar credenciais até que ambas as partes confirmem.
*/
