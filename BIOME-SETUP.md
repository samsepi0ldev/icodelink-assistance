# Configuração do Biome

## 🔧 Problemas Comuns e Soluções

### 1. Biome não está lendo a configuração

**Possíveis causas:**

- Extensão do Biome não instalada no VS Code
- Configuração incorreta no workspace
- Cache corrompido

**Soluções:**

#### Instalar a extensão do Biome

```bash
# No VS Code, instale a extensão oficial:
# Name: Biome
# Id: biomejs.biome
```

#### Limpar cache e reinstalar

```bash
# Na raiz do projeto
pnpm install
npx biome --version

# Limpar cache do Biome
rm -rf node_modules/.cache
rm -rf .turbo
```

#### Verificar se o Biome está funcionando

```bash
# Testar formatação
npx biome format --write apps/web/src/components/box.tsx

# Testar linting
npx biome lint apps/web/src/components/box.tsx

# Verificar configuração
npx biome check apps/web/src/components/box.tsx
```

### 2. VS Code não está usando o Biome

**Verificar configurações do VS Code:**

1. Abra as configurações (Ctrl/Cmd + ,)
2. Procure por "default formatter"
3. Certifique-se que está configurado como "Biome"

**Ou edite manualmente `.vscode/settings.json`:**

```json
{
  "editor.defaultFormatter": "biomejs.biome",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.biome": "explicit",
    "source.organizeImports.biome": "explicit"
  }
}
```

### 3. Configuração não está sendo aplicada

**Verificar hierarquia de configuração:**

1. `.biomejs.json` (raiz)
2. `biome.jsonc` (raiz)
3. `apps/web/biome.jsonc` (específico do app)

**Forçar aplicação da configuração:**

```bash
# Formatar com configuração específica
npx biome format --config-path=./biome.jsonc --write .

# Verificar qual configuração está sendo usada
npx biome rage
```

## 📋 Comandos Disponíveis

### Na raiz do projeto:

```bash
# Verificar tudo
pnpm check

# Corrigir automaticamente
pnpm check:fix

# Apenas formatar
pnpm format:write

# Apenas lint
pnpm lint:fix
```

### No app web:

```bash
cd apps/web

# Verificar apenas o app web
pnpm check

# Corrigir apenas o app web
pnpm check:fix
```

## 🔍 Debug

### Verificar se o Biome está funcionando:

```bash
# Versão do Biome
npx biome --version

# Informações de debug
npx biome rage

# Testar em arquivo específico
npx biome check apps/web/src/components/box.tsx --verbose
```

### Logs do VS Code:

1. Abra o Command Palette (Ctrl/Cmd + Shift + P)
2. Digite "Developer: Reload Window"
3. Abra "Output" panel
4. Selecione "Biome" no dropdown

## ⚙️ Configuração Atual

### Formatação:

- Semicolons: As needed
- Quotes: Single quotes
- JSX Quotes: Double quotes
- Trailing commas: ES5
- Line width: 80 characters

### Linting:

- Recommended rules enabled
- Console.log allowed
- Block statements optional
- Namespace imports allowed

### Arquivos incluídos:

- `**/*.js`, `**/*.jsx`
- `**/*.ts`, `**/*.tsx`
- `**/*.json`, `**/*.jsonc`

### Arquivos ignorados:

- `**/node_modules/**`
- `**/dist/**`, `**/build/**`
- `**/.next/**`, `**/.turbo/**`
