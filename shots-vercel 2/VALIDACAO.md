# Verificação realizada

- Sintaxe JavaScript verificada (painel, site, portfólio e animações originais).
- Testes em Chromium: estado de configuração pendente; inicialização da página pública; abertura de menu; portfólio com seis projetos; filtros por categoria; visualizador de projeto.
- Testes do painel com backend simulado: erro de login, entrada autorizada, edição e publicação de textos, adição de projetos e validação de capa obrigatória.
- Inspeção visual do login e painel em desktop e portfólio de gestão em ecrã móvel de 390 px; sem overflow horizontal da página.
- NÃO foi feito deploy, criada conta Supabase ou executado SQL numa base real. Login real, uploads, permissões RLS, concorrência real e envio de recuperação por email precisam de teste após configuração.
- Imagens/vídeos originais não disponíveis. A inspeção não confirma enquadramento ou reprodução dos ficheiros ausentes.

O teste reproduzível está em tests/browser-test.cjs. Executar na raiz do projeto depois de instalar Playwright num ambiente de testes (`npm install --no-save playwright` e `npx playwright install chromium`): `node tests/browser-test.cjs`. O teste serve ficheiros por interceção de pedidos e usa um backend simulado; não publica nada. Os caminhos /tmp das capturas podem ser adaptados ao sistema operativo.

Atualização: leitura pública real do projeto Supabase validada com HTTP 200 (versão 1). Portfolio original integrado; dois JPEG recuperados e vídeo de introdução incluído. Testes do portfólio com seis projetos, filtro e modal repetidos. Login e upload reais continuam pendentes.
