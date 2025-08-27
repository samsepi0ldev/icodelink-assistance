# Requisitos do Sistema

## Introdução

Este documento define os requisitos para um sistema de gerenciamento de estoque de peças e dispositivos eletrônicos voltado para assistências técnicas. O sistema incluirá funcionalidades para cadastro de clientes, controle de estoque, venda de serviços, gerenciamento de ordens de serviço e um aplicativo mobile para acompanhamento em tempo real.

## Requisitos

### Requisito 1 - Cadastro e Gerenciamento de Clientes

**História do Usuário:** Como atendente da assistência técnica, quero cadastrar e gerenciar informações dos clientes, para que eu possa manter um histórico completo de cada cliente e seus equipamentos.

#### Critérios de Aceitação

1. QUANDO o atendente acessa a tela de cadastro ENTÃO o sistema DEVE permitir inserir nome, telefone, email, CPF/CNPJ e endereço do cliente
2. QUANDO o atendente busca por um cliente ENTÃO o sistema DEVE permitir pesquisa por nome, telefone ou CPF/CNPJ
3. QUANDO um cliente já existe no sistema ENTÃO o sistema DEVE exibir o histórico de serviços anteriores
4. QUANDO o atendente edita dados do cliente ENTÃO o sistema DEVE validar os campos obrigatórios e formatos
5. SE o CPF/CNPJ já existe ENTÃO o sistema DEVE impedir cadastro duplicado

### Requisito 2 - Controle de Estoque de Peças e Dispositivos

**História do Usuário:** Como técnico da assistência, quero controlar o estoque de peças e dispositivos, para que eu possa saber a disponibilidade em tempo real e evitar falta de componentes.

#### Critérios de Aceitação

1. QUANDO o técnico cadastra uma peça ENTÃO o sistema DEVE permitir inserir código, descrição, categoria, quantidade, preço de custo e preço de venda
2. QUANDO uma peça é utilizada em um serviço ENTÃO o sistema DEVE automaticamente decrementar a quantidade do estoque
3. QUANDO o estoque de uma peça atinge o mínimo ENTÃO o sistema DEVE gerar alerta automático
4. QUANDO o técnico consulta o estoque ENTÃO o sistema DEVE permitir filtros por categoria, disponibilidade e código
5. QUANDO uma entrada de estoque é registrada ENTÃO o sistema DEVE atualizar a quantidade e registrar histórico de movimentação

### Requisito 3 - Venda de Serviços e Orçamentos

**História do Usuário:** Como atendente, quero criar orçamentos e registrar vendas de serviços, para que eu possa formalizar os acordos com clientes e controlar a receita.

#### Critérios de Aceitação

1. QUANDO o atendente cria um orçamento ENTÃO o sistema DEVE permitir selecionar cliente, tipo de serviço, peças necessárias e valor da mão de obra
2. QUANDO um orçamento é aprovado pelo cliente ENTÃO o sistema DEVE converter automaticamente em ordem de serviço
3. QUANDO um serviço é finalizado ENTÃO o sistema DEVE gerar nota fiscal ou recibo
4. SE o orçamento não for aprovado em 30 dias ENTÃO o sistema DEVE marcar como expirado
5. QUANDO o atendente consulta vendas ENTÃO o sistema DEVE exibir relatórios por período, técnico e tipo de serviço

### Requisito 4 - Gerenciamento de Ordens de Serviço

**História do Usuário:** Como técnico, quero gerenciar ordens de serviço com controle de status, para que eu possa acompanhar o progresso dos reparos e informar os clientes.

#### Critérios de Aceitação

1. QUANDO uma ordem de serviço é criada ENTÃO o sistema DEVE gerar número único e definir status inicial como "Recebido"
2. QUANDO o técnico atualiza o status ENTÃO o sistema DEVE permitir os estados: Recebido, Em Análise, Aguardando Peças, Em Reparo, Testando, Pronto para Retirada, Entregue
3. QUANDO o status muda ENTÃO o sistema DEVE registrar data/hora e usuário responsável pela alteração
4. QUANDO o técnico adiciona observações ENTÃO o sistema DEVE manter histórico completo de comentários
5. QUANDO o serviço fica pronto ENTÃO o sistema DEVE notificar automaticamente o cliente

### Requisito 5 - Aplicativo Mobile para Clientes

**História do Usuário:** Como cliente da assistência técnica, quero acompanhar o status do meu equipamento pelo celular, para que eu saiba quando posso retirar sem precisar ligar.

#### Critérios de Aceitação

1. QUANDO o cliente acessa o app ENTÃO o sistema DEVE permitir login com CPF e número da ordem de serviço
2. QUANDO o cliente visualiza sua ordem ENTÃO o sistema DEVE exibir status atual, descrição do problema e previsão de entrega
3. QUANDO o status é atualizado ENTÃO o sistema DEVE enviar notificação push para o cliente
4. QUANDO o serviço fica pronto ENTÃO o sistema DEVE exibir valor total e formas de pagamento aceitas
5. SE o cliente não possui ordem ativa ENTÃO o sistema DEVE exibir histórico de serviços anteriores

### Requisito 6 - Relatórios e Dashboard

**História do Usuário:** Como gerente da assistência técnica, quero visualizar relatórios e indicadores, para que eu possa tomar decisões baseadas em dados sobre o negócio.

#### Critérios de Aceitação

1. QUANDO o gerente acessa o dashboard ENTÃO o sistema DEVE exibir total de ordens por status, faturamento do mês e peças em falta
2. QUANDO o gerente gera relatório de vendas ENTÃO o sistema DEVE permitir filtros por período, técnico e tipo de serviço
3. QUANDO o gerente consulta relatório de estoque ENTÃO o sistema DEVE exibir giro de estoque, itens parados e necessidade de reposição
4. QUANDO o gerente visualiza relatório de produtividade ENTÃO o sistema DEVE mostrar tempo médio de reparo por técnico e tipo de serviço
5. QUANDO um relatório é gerado ENTÃO o sistema DEVE permitir exportação em PDF e Excel

### Requisito 7 - Autenticação e Controle de Acesso

**História do Usuário:** Como administrador do sistema, quero controlar o acesso dos usuários, para que cada pessoa tenha permissões adequadas ao seu cargo.

#### Critérios de Aceitação

1. QUANDO um usuário faz login ENTÃO o sistema DEVE validar credenciais e definir permissões baseadas no perfil
2. QUANDO um atendente acessa o sistema ENTÃO o sistema DEVE permitir cadastro de clientes, criação de orçamentos e consulta de estoque
3. QUANDO um técnico acessa o sistema ENTÃO o sistema DEVE permitir atualização de ordens de serviço e controle de estoque
4. QUANDO um gerente acessa o sistema ENTÃO o sistema DEVE permitir acesso completo incluindo relatórios e configurações
5. SE um usuário tenta acessar funcionalidade sem permissão ENTÃO o sistema DEVE negar acesso e registrar tentativa

### Requisito 8 - Notificações e Comunicação

**História do Usuário:** Como cliente, quero receber notificações sobre meu equipamento, para que eu seja informado automaticamente sobre mudanças de status.

#### Critérios de Aceitação

1. QUANDO o status de uma ordem muda ENTÃO o sistema DEVE enviar SMS ou WhatsApp para o cliente
2. QUANDO um orçamento é criado ENTÃO o sistema DEVE enviar link para aprovação via WhatsApp
3. QUANDO um serviço fica pronto ENTÃO o sistema DEVE notificar por SMS, WhatsApp e push notification no app
4. SE o cliente não retira o equipamento em 30 dias ENTÃO o sistema DEVE enviar lembrete automático
5. QUANDO há promoções ou campanhas ENTÃO o sistema DEVE permitir envio de mensagens em massa para clientes ativos