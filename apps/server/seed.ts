import { seed } from 'drizzle-seed'
import { db } from './src/db/connection.ts'
import * as schema from './src/db/schema.ts'

async function main() {
  await seed(db, schema).refine((f) => ({
    categories: {
      table: schema.categories,
      rows: 3,
      values: ({ faker, row }) => ({
        name: faker.commerce.department(),
      }),
    },
    boxes: {
      columns: {
        name: f.valuesFromArray({
          values: [
            'Caixa Eletrônicos A1',
            'Caixa Ferramentas B2',
            'Caixa Peças C3',
            'Caixa Acessórios D4',
            'Caixa Dispositivos E5',
            'Caixa Componentes F6',
            'Caixa Reparos G7',
            'Caixa Estoque H8',
            'Caixa Vendas I9',
            'Caixa Diversos J10',
          ],
        }),
        description: f.valuesFromArray({
          values: [
            'Caixa para armazenamento de componentes eletrônicos',
            'Caixa para ferramentas de manutenção e reparo',
            'Caixa para peças de reposição diversas',
            'Caixa para acessórios e complementos',
            'Caixa para dispositivos eletrônicos completos',
            'Caixa para componentes pequenos e circuitos',
            'Caixa para itens em processo de reparo',
            'Caixa para itens em estoque aguardando venda',
            'Caixa para itens já vendidos aguardando retirada',
            'Caixa para itens diversos e não categorizados',
          ],
        }),
        location: f.valuesFromArray({
          values: [
            'Prateleira A - Setor 1',
            'Prateleira B - Setor 1',
            'Prateleira C - Setor 2',
            'Prateleira D - Setor 2',
            'Prateleira E - Setor 3',
            'Prateleira F - Setor 3',
            'Bancada - Área de Reparo',
            'Estoque - Área Central',
            'Balcão - Área de Vendas',
            'Depósito - Área Traseira',
          ],
        }),
        capacity: f.valuesFromArray({
          values: [
            '50 itens pequenos',
            '30 ferramentas',
            '40 peças médias',
            '60 acessórios',
            '20 dispositivos',
            '80 componentes',
            '25 itens em reparo',
            '35 itens estoque',
            '15 itens vendidos',
            '45 itens diversos',
          ],
        }),
      },
      count: 5,
      with: {
        items: 20,
      },
    },
  }))
}

main()
