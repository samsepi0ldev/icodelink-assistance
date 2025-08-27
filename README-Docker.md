# Docker Setup - Sistema de Gerenciamento de Assistência Técnica

Este documento explica como configurar e executar o sistema usando Docker e Docker Compose.

## 📋 Pré-requisitos

- Docker 20.10+
- Docker Compose 2.0+
- 4GB RAM disponível
- 10GB espaço em disco

## 🚀 Início Rápido

### 1. Configuração Inicial

```bash
# Clone o repositório
git clone <repository-url>
cd assistencia-tecnica

# Copie o arquivo de exemplo de variáveis de ambiente
cp .env.example .env

# Edite as variáveis de ambiente conforme necessário
nano .env
```

### 2. Executar em Desenvolvimento

```bash
# Iniciar todos os serviços
docker-compose up -d

# Ver logs em tempo real
docker-compose logs -f

# Parar todos os serviços
docker-compose down
```

### 3. Executar em Produção

```bash
# Usar configuração de produção
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Executar backup manual
docker-compose --profile backup run --rm backup
```

## 🏗️ Arquitetura dos Containers

### Serviços Principais

| Serviço | Porta | Descrição |
|---------|-------|-----------|
| **frontend** | 3000 | Aplicação React |
| **backend** | 3001 | API Principal |
| **auth-service** | 3002 | Serviço de Autenticação |
| **notification-service** | 3003 | Serviço de Notificações |
| **postgres** | 5432 | Banco de Dados |
| **redis** | 6379 | Cache e Sessões |
| **nginx** | 80/443 | Proxy Reverso |

### Serviços de Monitoramento

| Serviço | Porta | Descrição |
|---------|-------|-----------|
| **pgadmin** | 5050 | Admin PostgreSQL |
| **redis-insight** | 8001 | Admin Redis |
| **prometheus** | 9090 | Métricas |
| **grafana** | 3030 | Dashboards |

## 🔧 Comandos Úteis

### Gerenciamento de Containers

```bash
# Ver status dos containers
docker-compose ps

# Reiniciar um serviço específico
docker-compose restart backend

# Ver logs de um serviço
docker-compose logs -f backend

# Executar comando em um container
docker-compose exec backend npm run migrate

# Rebuild de um serviço
docker-compose build backend
docker-compose up -d backend
```

### Banco de Dados

```bash
# Executar migrações
docker-compose exec backend npm run migrate

# Executar seeds
docker-compose exec backend npm run seed

# Backup manual
docker-compose --profile backup run --rm backup

# Restaurar backup
docker-compose exec postgres pg_restore -U postgres -d assistencia_db /backups/backup_file.sql
```

### Desenvolvimento

```bash
# Instalar dependências
docker-compose exec backend npm install
docker-compose exec frontend npm install

# Executar testes
docker-compose exec backend npm test
docker-compose exec frontend npm test

# Acessar shell do container
docker-compose exec backend sh
```

## 📁 Estrutura de Volumes

```
project/
├── uploads/              # Arquivos enviados
├── logs/                 # Logs da aplicação
├── database/
│   ├── init/            # Scripts de inicialização
│   └── backups/         # Backups automáticos
├── nginx/
│   ├── nginx.conf       # Configuração Nginx
│   ├── conf.d/          # Configurações adicionais
│   └── ssl/             # Certificados SSL
├── redis/
│   └── redis.conf       # Configuração Redis
└── monitoring/
    ├── prometheus.yml   # Configuração Prometheus
    └── grafana/         # Dashboards Grafana
```

## 🔐 Configuração de Segurança

### Variáveis de Ambiente Importantes

```bash
# JWT Secrets (ALTERE EM PRODUÇÃO!)
JWT_SECRET=your-super-secret-jwt-key-change-in-production-2024
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-in-production-2024

# Senhas do Banco
POSTGRES_PASSWORD=postgres123
REDIS_PASSWORD=redis123

# APIs Externas
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
```

### SSL em Produção

1. Obtenha certificados SSL (Let's Encrypt recomendado)
2. Coloque os certificados em `nginx/ssl/`
3. Descomente o bloco HTTPS no `nginx.conf`
4. Reinicie o nginx: `docker-compose restart nginx`

## 📊 Monitoramento

### Acessar Dashboards

- **pgAdmin**: http://localhost:5050
  - Email: admin@assistencia.com
  - Senha: admin123

- **Redis Insight**: http://localhost:8001

- **Prometheus**: http://localhost:9090

- **Grafana**: http://localhost:3030
  - Usuário: admin
  - Senha: admin123

### Métricas Importantes

- CPU e Memória dos containers
- Tempo de resposta das APIs
- Conexões do banco de dados
- Cache hit rate do Redis
- Erros HTTP por endpoint

## 🔄 Backup e Recuperação

### Backup Automático

O sistema executa backups automáticos diariamente:

```bash
# Configurar cron para backup diário (em produção)
0 2 * * * docker-compose --profile backup run --rm backup
```

### Recuperação de Backup

```bash
# Listar backups disponíveis
ls -la database/backups/

# Restaurar backup específico
docker-compose exec postgres pg_restore \
  -U postgres -d assistencia_db \
  -c --if-exists \
  /backups/assistencia_backup_20240108_020000.sql.gz
```

## 🚨 Troubleshooting

### Problemas Comuns

**Container não inicia:**
```bash
# Verificar logs
docker-compose logs service-name

# Verificar recursos
docker system df
docker system prune
```

**Banco de dados não conecta:**
```bash
# Verificar se o PostgreSQL está rodando
docker-compose exec postgres pg_isready -U postgres

# Testar conexão
docker-compose exec backend npm run db:test
```

**Frontend não carrega:**
```bash
# Verificar se o build foi feito
docker-compose exec frontend npm run build

# Verificar nginx
docker-compose logs nginx
```

### Logs Importantes

```bash
# Logs da aplicação
tail -f logs/app.log

# Logs do nginx
tail -f nginx/logs/access.log
tail -f nginx/logs/error.log

# Logs do PostgreSQL
docker-compose logs postgres
```

## 🔧 Customização

### Adicionar Novo Serviço

1. Adicione o serviço no `docker-compose.yml`
2. Configure as variáveis de ambiente
3. Adicione as rotas no nginx se necessário
4. Atualize a documentação

### Configurar SSL Personalizado

1. Coloque os certificados em `nginx/ssl/`
2. Edite `nginx/nginx.conf`
3. Reinicie: `docker-compose restart nginx`

### Alterar Portas

Edite as portas no `docker-compose.yml` e atualize as variáveis de ambiente correspondentes.

## 📞 Suporte

Para problemas relacionados ao Docker:

1. Verifique os logs: `docker-compose logs`
2. Verifique recursos: `docker system df`
3. Reinicie os serviços: `docker-compose restart`
4. Em último caso: `docker-compose down && docker-compose up -d`