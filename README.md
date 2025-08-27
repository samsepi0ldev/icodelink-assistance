# 🔧 IL Assistance - Sistema de Gerenciamento para Assistência Técnica

Sistema completo de gerenciamento de estoque, clientes e ordens de serviço para assistências técnicas de dispositivos eletrônicos, incluindo aplicativo mobile para acompanhamento em tempo real.

## 📋 Sobre o Projeto

O **IL Assistance** é uma solução moderna e completa desenvolvida para otimizar a gestão de assistências técnicas, oferecendo controle total sobre estoque de peças, cadastro de clientes, ordens de serviço e comunicação automatizada com os clientes.

### 🎯 Principais Funcionalidades

- **Gestão de Clientes**: Cadastro completo com histórico de serviços
- **Controle de Estoque**: Gerenciamento de peças com alertas automáticos
- **Ordens de Serviço**: Workflow completo com rastreamento de status
- **Orçamentos**: Sistema de aprovação e conversão automática
- **App Mobile**: Acompanhamento em tempo real para clientes
- **Notificações**: SMS, WhatsApp e push notifications automáticas
- **Relatórios**: Dashboard com métricas e relatórios gerenciais
- **Multi-usuário**: Sistema de permissões por perfil

## 🛠️ Tecnologias Utilizadas

### Frontend Web

- **React 18** + TypeScript
- **TanStack Router** para roteamento
- **TanStack Query** para gerenciamento de estado
- **Radix UI** + **Tailwind CSS** para interface
- **Vite** como bundler

### Backend API

- **Node.js** + TypeScript
- **Fastify** como framework web
- **Drizzle ORM** para banco de dados
- **PostgreSQL** como banco principal
- **JWT** para autenticação
- **Zod** para validação de dados

### Ferramentas de Desenvolvimento

- **Turbo** para monorepo
- **Biome** para linting e formatação
- **Docker** para containerização
- **pnpm** como gerenciador de pacotes

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+
- pnpm 8+
- Docker e Docker Compose
- PostgreSQL 14+

### Instalação

1. **Clone o repositório**

```bash
git clone <repository-url>
cd il-assistance
```

2. **Instale as dependências**

```bash
pnpm install
```

3. **Configure as variáveis de ambiente**

```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. **Inicie o banco de dados**

```bash
docker-compose up -d postgres redis
```

5. **Execute as migrações**

```bash
cd apps/server
pnpm db:migrate
pnpm seed
```

6. **Inicie o ambiente de desenvolvimento**

```bash
pnpm dev
```

### Acessos

- **Frontend Web**: http://localhost:5173
- **API Backend**: http://localhost:3000
- **Documentação API**: http://localhost:3000/docs
- **Drizzle Studio**: http://localhost:4983

## 📁 Estrutura do Projeto

```
il-assistance/
├── apps/
│   ├── server/          # API Backend (Fastify + Drizzle)
│   └── web/             # Frontend Web (React + Vite)
├── packages/            # Pacotes compartilhados
├── nginx/               # Configuração Nginx
├── scripts/             # Scripts de automação
├── docker-compose.yml   # Configuração Docker
└── turbo.json          # Configuração Turbo
```

## 🏗️ Arquitetura

### Backend (apps/server)

- **Framework**: Fastify com TypeScript
- **ORM**: Drizzle com PostgreSQL
- **Autenticação**: JWT com cookies seguros
- **Validação**: Zod schemas
- **Documentação**: Swagger/OpenAPI automática

### Frontend (apps/web)

- **Framework**: React 18 com TypeScript
- **Roteamento**: TanStack Router (file-based)
- **Estado**: TanStack Query + Context API
- **UI**: Radix UI primitives + Tailwind CSS
- **Formulários**: React Hook Form + Zod

### Banco de Dados

- **Principal**: PostgreSQL 14+
- **Cache**: Redis (sessões e cache)
- **ORM**: Drizzle com migrações automáticas

## 📊 Funcionalidades Detalhadas

### 👥 Gestão de Clientes

- Cadastro completo com validação de CPF/CNPJ
- Histórico de serviços e orçamentos
- Sistema de busca avançada
- Endereços e múltiplos contatos

### 📦 Controle de Estoque

- Cadastro de peças com códigos únicos
- Controle de entrada e saída automático
- Alertas de estoque mínimo
- Relatórios de giro e movimentação
- Categorização e localização física

### 🔧 Ordens de Serviço

- Workflow completo: Recebido → Em Análise → Em Reparo → Pronto → Entregue
- Histórico detalhado de mudanças
- Anexo de fotos e documentos
- Estimativas de prazo e valor
- Integração automática com estoque

### 💰 Sistema de Orçamentos

- Criação automática baseada em peças e mão de obra
- Aprovação via WhatsApp ou sistema web
- Conversão automática para ordem de serviço
- Controle de validade e follow-up

### 📱 Aplicativo Mobile (Planejado)

- Acompanhamento de status em tempo real
- Notificações push automáticas
- Histórico de serviços
- Avaliação de atendimento

### 🔔 Sistema de Notificações

- SMS automático para mudanças de status
- WhatsApp para orçamentos e aprovações
- Push notifications no app mobile
- Templates personalizáveis

## 🔐 Segurança

- **Autenticação**: JWT com refresh tokens
- **Autorização**: Sistema de roles (Admin, Gerente, Técnico, Atendente)
- **Validação**: Sanitização de dados com Zod
- **Cookies**: Secure, HttpOnly, SameSite
- **CORS**: Configurado para domínios específicos
- **Rate Limiting**: Proteção contra ataques

## 🧪 Testes

### Backend

```bash
cd apps/server
pnpm test              # Testes unitários
pnpm test:integration  # Testes de integração
pnpm test:coverage     # Cobertura de testes
```

### Frontend

```bash
cd apps/web
pnpm test              # Testes unitários
pnpm test:e2e          # Testes end-to-end
```

## 📈 Performance

- **Backend**: Response time < 200ms
- **Frontend**: First Contentful Paint < 1.5s
- **Database**: Índices otimizados e queries eficientes
- **Cache**: Redis para consultas frequentes
- **CDN**: Assets estáticos otimizados

## 🚀 Deploy

### Desenvolvimento

```bash
pnpm dev  # Inicia todos os serviços
```

### Produção

```bash
docker-compose up -d  # Deploy completo com Docker
```

### Variáveis de Ambiente

```env
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/il_assistance
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-key

# API
PORT=3000
NODE_ENV=production

# Notifications
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
WHATSAPP_API_KEY=your-whatsapp-key
```

## 📚 Documentação

- **API**: Disponível em `/docs` quando o servidor está rodando
- **Banco de Dados**: Schemas documentados no Drizzle Studio
- **Frontend**: Storybook com componentes (planejado)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

### Padrões de Código

- **Linting**: Biome para JavaScript/TypeScript
- **Formatação**: Biome com configuração personalizada
- **Commits**: Conventional Commits
- **Branches**: GitFlow simplificado

## 📋 Roadmap

### ✅ Concluído

- [x] Setup inicial do projeto
- [x] Autenticação JWT
- [x] CRUD de clientes básico
- [x] Interface base com Radix UI

### 🚧 Em Desenvolvimento

- [ ] Sistema completo de estoque
- [ ] Ordens de serviço com workflow
- [ ] Dashboard com métricas
- [ ] Sistema de notificações

### 📅 Planejado

- [ ] Aplicativo mobile React Native
- [ ] Integração com WhatsApp Business
- [ ] Relatórios avançados
- [ ] Sistema de backup automático
- [ ] API pública para integrações

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Equipe

- **Backend**: Node.js + Fastify + Drizzle
- **Frontend**: React + TanStack + Radix UI
- **DevOps**: Docker + Nginx + PostgreSQL

## 📞 Suporte

Para suporte técnico ou dúvidas sobre o projeto:

- 📧 Email: suporte@il-assistance.com
- 📱 WhatsApp: +55 (11) 99999-9999
- 🐛 Issues: [GitHub Issues](https://github.com/seu-usuario/il-assistance/issues)

---

**Desenvolvido com ❤️ para otimizar assistências técnicas**
