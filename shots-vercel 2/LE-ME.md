# Atualização com os teus ficheiros

A chave pública e a URL do teu projeto Supabase já estão preenchidas. Como já executaste o SQL e autorizaste o utilizador, NÃO repitas esses passos.

Incluído: o teu portfolio.html adaptado à gestão, os seis projetos originais, duas imagens extraídas do HTML e videos/intro-com-som.mp4. O ZIP enviado não continha os outros vídeos nem a pasta de fotografias. Os reels continuam acessíveis pelos links Instagram; não foram inventados vídeos.

As fotografias ausentes podem ser carregadas no /admin. Antes de entregar o site, confirma capa, retrato, logótipo, assinatura e imagens dos serviços. Não é necessário reenviar as pastas se preferires carregá-las pelo painel.

Para publicar: carrega o CONTEÚDO desta pasta no GitHub, importa o repositório na Vercel, escolhe Other e Output Directory public. Depois abre /admin e usa o email e palavra-passe que criaste no Supabase.

Se já tinhas publicado conteúdos no painel, esses conteúdos guardados têm prioridade sobre os seis projetos deste pacote. Não são apagados por este ZIP.

---

# Shots by Aurélio — site + gestão

Projeto preparado para Vercel. O site existente mantém o design e as animações; /admin gere textos, imagens, contactos e projetos. Foi criada uma página de portfólio completo porque esse ficheiro não estava no anexo.

## O que falta para ficar online

1. Criar um projeto Supabase para autenticação, base de dados e imagens.
2. Executar o SQL e criar/autorizar o utilizador do cliente.
3. Preencher duas configurações públicas e publicar na Vercel.
4. Adicionar as imagens e vídeos originais (não estavam incluídos no ficheiro enviado).

Não há contas, palavras-passe ou serviços externos já criados neste ZIP. O login não aceita credenciais fictícias. Sem configuração o site mostra os conteúdos originais e o login indica o que falta.

## 1. Configurar o Supabase

- Criar conta/projeto em https://supabase.com/dashboard . Guardar a palavra-passe da base de dados num local seguro; não colocá-la no site.
- No SQL Editor executar `supabase/setup.sql` UMA vez num projeto novo.
- Em Authentication > Users criar manualmente o utilizador com o email do cliente e palavra-passe forte (mínimo recomendado 12 caracteres). Confirmar o email na criação se essa opção estiver disponível.
- Copiar o UUID desse utilizador e executar:

```sql
insert into public.site_admins(user_id) values ('COLOCAR-UUID-AQUI');
```

- Desativar inscrições públicas nas definições de autenticação. Não existe formulário de registo no site; apenas contas autorizadas em site_admins podem publicar/carregar ficheiros.
- Nas definições do projeto obter a Project URL e a chave pública Publishable (ou anon legada).
- Editar `public/assets/config.js`:

```js
window.SHOTS_CONFIG = {
  supabaseUrl: 'https://TEU-PROJETO.supabase.co',
  supabaseKey: 'TUA-CHAVE-PUBLICA'
};
```

A chave pública pode estar no browser; as políticas SQL controlam as permissões. NUNCA colocar `service_role`, `sb_secret_...`, palavra-passe da base de dados ou palavra-passe do cliente neste ficheiro.

## 2. Publicar na Vercel

- Descompactar o ZIP. Criar um repositório GitHub e carregar o CONTEÚDO da pasta shots-vercel (vercel.json deve ficar na raiz do repositório).
- Em https://vercel.com/new importar esse repositório.
- Framework Preset: Other. Sem comando de build. Output Directory: public (já indicado em vercel.json). Root Directory: raiz do projeto.
- Deploy. Abrir o domínio atribuído, por exemplo https://teu-site.vercel.app . A gestão estará em https://teu-site.vercel.app/admin .
- Não é preciso comprar domínio. O plano escolhido pelo titular continua sujeito às condições da Vercel.

## 3. Recuperação de palavra-passe

No Supabase Authentication > URL Configuration:
- Site URL = o endereço final do site, com https.
- Redirect URLs = https://teu-site.vercel.app/admin (adicionar separadamente qualquer domínio próprio).
- Configurar um serviço SMTP de produção para recuperação por email. O serviço de email de teste do Supabase tem restrições; não assumir que envia para qualquer cliente. Sem SMTP, o titular pode redefinir o acesso no painel Supabase.
- Testar “Esqueci-me da palavra-passe” com a conta real antes de entregar.

## 4. Imagens e vídeos

O anexo continha apenas HTML, sem os ficheiros multimédia. Ver `FICHEIROS-ORIGINAIS.txt`.
- Copiar as pastas originais imagens/ e videos/ para dentro de public/ mantendo os nomes.
- Ou substituir as imagens através de /admin. Uploads aceitam JPG, PNG, WebP e AVIF até 10 MB.
- Vídeos: indicar caminho local videos/nome.mp4 ou URL direta HTTPS de MP4. Um link da página Instagram/YouTube não funciona no campo Vídeo MP4. Usar esses links no campo Ligação externa.
- As imagens são públicas depois de carregadas. A remoção de um projeto retira-o da página, mas mantém o ficheiro no armazenamento para evitar quebrar imagens reutilizadas. Limpar ficheiros órfãos manualmente no Supabase quando necessário.
- O armazenamento e tráfego Supabase têm limites próprios. Confirmar os limites em https://supabase.com/pricing ; não é armazenamento ilimitado.

## 5. Utilização pelo cliente

1. Abrir /admin e entrar com email/palavra-passe.
2. Textos e contactos: editar por secção; alguns títulos com destaque têm campos separados para preservar o desenho.
3. Imagens e vídeo: substituir as fotografias e o vídeo de fundo.
4. Portfólio: adicionar projetos, carregar fotografia, alterar categoria, descrição e links, reordenar com setas. “Mostrar na página inicial” coloca o projeto na seleção 3D.
5. Publicar alterações. Abrir/recarregar o site para as ver.
6. Terminar sessão quando acabar. A sessão é guardada apenas na sessão do browser.

As alterações ficam no Supabase, não dependem do computador do cliente e não exigem um novo deploy. Dois editores simultâneos não sobrescrevem silenciosamente: o segundo recebe um aviso e deve exportar a cópia antes de recarregar.

O formulário de orçamento original continua a abrir o WhatsApp. Não é um sistema de envio automático de email. O número WhatsApp pode ser alterado em Textos e contactos.

## Teste antes da entrega

- Autorizar a conta do cliente e testar login/logout.
- Publicar um texto e uma imagem, verificar numa janela anónima.
- Adicionar/reordenar/remover um projeto; verificar destaques, portfólio e filtros.
- Criar conta não autorizada para teste: não deve entrar na gestão nem escrever na API. Testar escrita anónima diretamente também: deve falhar.
- Testar recuperação com SMTP e domínio final.
- Confirmar todas as imagens e vídeos originais, WhatsApp e links.

## Desenvolvimento local

Na pasta public: `python3 -m http.server 8000`.
Abrir http://localhost:8000 e http://localhost:8000/admin/ . Não abrir os HTML via file://.

## Segurança e arquitetura

HTML/CSS/JS estáticos, SDK Supabase incluído localmente (v2.57.4). RLS protege alterações e uploads; visitante só lê conteúdos publicados. Não se guardam palavras-passe na base de dados de conteúdos. Os textos são inseridos como texto, nunca HTML; URLs perigosas são rejeitadas. O HTML do login é público, mas os poderes de gestão são protegidos no servidor pelas políticas SQL. Apenas uma tabela de conteúdo publicado, sem rascunho remoto. Alterações não publicadas perdem-se ao fechar o browser.

As páginas públicas continuam disponíveis com os conteúdos originais caso a base de dados falhe; nessa situação podem mostrar uma versão antiga. Os backups exportados incluem os dados e URLs, não os ficheiros de imagem/vídeo.
