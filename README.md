# Dany Mundo Rosa Beauty

Demonstração comercial desenvolvida para apresentação da **Ghati Inovações**. Não representa um website oficial aprovado pela proprietária.

## Executar

Requisitos: Node.js 22.12 ou superior e npm 9.6.5 ou superior.

No terminal, dentro desta pasta:

```powershell
npm ci
npm run dev
```

Abra o endereço local informado pelo terminal, normalmente `http://127.0.0.1:4321/`.

Para validar a versão de produção:

```powershell
npm run build
npm test
npm run preview
```

Para encerrar o servidor, use `Ctrl+C` no terminal que o iniciou. Não abra `dist/index.html` diretamente por `file://`: os caminhos dos assets precisam de servidor HTTP.

## Implementação

Astro 7.3.8, TypeScript e CSS próprio. HTML estático, sem framework de cliente, backend, cookies, analytics ou bibliotecas de animação. A única dependência da aplicação é Astro. Os componentes reutilizados são título editorial, botão de agendamento e fotografia com ampliação.

Seções: navegação, hero editorial, serviços, sobre o salão, portfólio conceitual, espaço reservado à apresentação da profissional, localização/agendamento e footer.

O agendamento é realizado no MinhaAgenda existente. Os links de WhatsApp, telefone, Instagram e Maps usam os canais confirmados na pesquisa. O website não envia mensagens nem cria reservas por conta própria.

## Direção visual

A captura longa fornecida determina a ordem das seções, títulos com deslocamentos laterais, itálicos sobrepostos, galeria horizontal de três fotografias, divisão do bloco sobre e colagem com cinco recortes. O contorno do dispositivo e o ambiente externo da captura são a moldura da referência e não foram incorporados como interface.

O arquivo da marca agora é um PNG transparente limpo, redesenhado a partir da referência enviada. Ele preserva a rosa, o lettering “Dany Mundo Rosa”, o detalhe verde de tesoura e a assinatura, sem o fundo e os artefatos da foto da placa. A escala do site foi ampliada em desktop, com conteúdo até 1600px e hero até 1680px; as regras mobile foram mantidas.

Instrument Sans foi escolhida pela construção compacta e forte dos títulos, próxima da referência; Instrument Serif em itálico traz o contraste estreito e orgânico. Onest foi considerada como alternativa, mas sua construção mais arredondada se afastava do peso editorial da referência. As famílias escolhidas foram comparadas com os títulos reais nas renderizações desktop e mobile. Os arquivos WOFF2 latinos, incluindo os acentos portugueses usados, estão hospedados localmente com `font-display: swap`. A distribuição WOFF2 utilizada da Sans tem peso variável 400–700 e largura 100%; não são presumidos eixos adicionais. A Serif itálica tem peso estático 400. Licenças OFL acompanham os arquivos em `public/fonts`.

Origem das fontes: [Instrument Sans](https://github.com/google/fonts/tree/main/ofl/instrumentsans), [Instrument Serif](https://github.com/google/fonts/tree/main/ofl/instrumentserif).

Tokens de cor: off-white `#fbf8f6`, rosa chiclete `#ed5b94`, rosa claro `#f8a6c7`, blush `#fff0f5`, rosa de texto/ação `#a12657` / `#b62d59`, grafite `#32332f`, verde `#173b33`. Os botões mantêm rosa escuro com texto branco para conservar contraste.

Movimento: clipping sutil dos títulos, entrada das fotografias com diferenças de 50ms, zoom de 3,5% nas imagens e transições de botão. CSS e IntersectionObserver cobrem esses comportamentos. Hover de movimento exige ponteiro fino; preferência por movimento reduzido desativa transições e revela o conteúdo. Sem JavaScript, o conteúdo permanece visível. Não há parallax ou controle da rolagem.

## Dados e imagens

Consulte [ENTREGA.md](ENTREGA.md) para fontes, pendências, inventário dos assets e evidências de validação.

Dados comerciais centralizados em `src/data/business.ts`. Seções e fotografias em `src/pages/index.astro`; tokens e regras responsivas em `src/styles/global.css`; menu, reveals e ampliação em `src/scripts/interactions.ts`.

Substitua os PNGs de `src/assets` por fotografias autorizadas, ajustando imports, alt, recortes e legendas. Astro gera versões WebP com dimensões reservadas, `srcset` e carregamento tardio fora da hero.

## Aprovação e publicação oficial

A demonstração usa `noindex, nofollow, noarchive`, robots com `Disallow: /` e sitemap vazio. O JSON-LD BeautySalon contém somente nome, endereço, telefone, coordenadas e links confirmados; não publica horários divergentes, preços, avaliação agregada ou equipe.

Somente após aprovação da proprietária:

1. Validar as pendências, substituir os assets demonstrativos e incluir retrato/nome/função autorizados.
2. Revisar a copy com a proprietária e remover avisos de demonstração; atualizar title, descrição e Open Graph em `src/layouts/Layout.astro`.
3. Copiar `.env.example` para `.env`, preencher `PUBLIC_SITE_URL` com o domínio HTTPS oficial e definir `PUBLIC_INDEXABLE=true`.
4. Executar novamente build, testes e revisão visual. O teste específico de demonstração deve ser adaptado para verificar os metadados aprovados.
5. Hospedar **apenas `dist/`**. Não expor código-fonte, documentação, `.env` ou `node_modules`.

Sem domínio HTTPS e flag explícita, a indexação permanece bloqueada. A configuração gera canonical, OG image absoluto e sitemap com o domínio configurado. O bloqueio de indexação não equivale a controle de acesso: a demonstração local não possui conteúdo privado nem segredos.

O build estático pode ser servido por qualquer hospedagem estática compatível. Nenhuma publicação externa foi realizada nesta entrega.
