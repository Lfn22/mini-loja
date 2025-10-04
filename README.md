# Mini-Loja

Projeto Frontend de uma loja online desenvolvido com **React**, **Tailwind CSS** e **Vite**.  
Inclui funcionalidades modernas como carrinho toggle, integração com API externa, histórico de pedidos, login básico e responsividade mobile-first.

---

## 🚀 Tecnologias utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces interativas.  
- **Tailwind CSS**: Framework utilitário para estilização rápida e responsiva.  
- **Vite**: Build tool moderna, com hot-reload instantâneo e otimização de build.  
- **Fake Store API**: API externa que fornece produtos fictícios para testes e demonstração.  
- **LocalStorage**: Persistência de histórico de pedidos e estado do carrinho.  
- **Vercel**: Deploy na nuvem, com URL pública e atualização contínua via GitHub.

---

## 📂 Estrutura do projeto

mini-loja/
│
├─ src/
│ ├─ components/
│ │ ├─ Cart.jsx
│ │ ├─ Checkout.jsx
│ │ ├─ Header.jsx
│ │ ├─ HistoricoPedidos.jsx
│ │ └─ ProductCard.jsx
│ └─ App.jsx
│
├─ index.html
├─ package.json
└─ tailwind.config.js


---

## ⚡ Funcionalidades

1. **Carrinho Toggle**  
   - O carrinho só aparece ao ser clicado, nunca sobrepondo os produtos.  
   - Quantidade de itens é acumulativa.  

2. **Integração com Fake Store API**  
   - Produtos são carregados dinamicamente com `fetch`.  
   - Grid responsivo exibe produtos em desktop e mobile.  

3. **Histórico de pedidos**  
   - Cada compra é salva no **LocalStorage** para persistência mesmo após refresh.  

4. **Login básico**  
   - Validação simples de usuário e senha (exemplo didático).  

5. **Responsividade e animações**  
   - Mobile-first, grid adaptável e efeitos de hover em cards e botões.  

6. **Deploy na nuvem**  
   - Pode ser publicado no Vercel para demo pública e compartilhamento fácil.

---

## ⚙️ Como rodar localmente

1. Clonar o repositório:

```bash
git clone https://github.com/Lfn22/mini-loja.git
cd mini-loja
npm install
npm run dev
http://localhost:5173
npm run build


Lindomar Lopes de Negreiros Filho
Engenharia de Software | Frontend Developer