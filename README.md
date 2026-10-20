# TradePro Performance

Painel de cálculo de performance (CKO, SOS, MOP e KBDS) em formato de app (PWA).

## Arquivos
```
index.html            -> o app
manifest.json         -> nome, cores e ícones do app instalado
service-worker.js     -> cache / funcionamento offline
.nojekyll             -> evita processamento do Jekyll no GitHub Pages
icons/                -> logo em todos os tamanhos
```

## Publicar no GitHub Pages
1. Crie um repositório (ex.: `tradepro`) e envie **todos** estes arquivos mantendo a pasta `icons/` (inclusive o `.nojekyll`).
2. No repositório: **Settings → Pages → Build and deployment → Deploy from a branch**.
3. Escolha a branch `main` e a pasta `/ (root)` → **Save**.
4. Em 1–2 minutos o link aparece: `https://SEU-USUARIO.github.io/tradepro/`.

## Instalar no celular
- **Android (Chrome):** abra o link → aparece "Instalar app" (ou menu ⋮ → *Instalar aplicativo*).
- **iPhone (Safari):** abra o link → botão Compartilhar → *Adicionar à Tela de Início*.

## Atualizar o app depois
Substitua o `index.html` no GitHub e, em `service-worker.js`, aumente o número de `CACHE_VERSION` (hoje `'v2'`, depois `'v3'`, e assim por diante) para os celulares baixarem a versão nova.

## Observações
- O app usa bibliotecas online (React, Tailwind, fontes). Depois do primeiro acesso com internet, elas ficam guardadas e o app abre offline.
- A leitura de MOP por imagem (OCR) precisa de internet na primeira vez que for usada.
