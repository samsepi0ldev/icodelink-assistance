import { Package2, PlusCircle } from 'lucide-react'
import { Button } from './ui/button'

type EmptyStateItemsProps = {
  boxName?: string
  onCreateItem?: () => void
  children?: React.ReactNode
}

export function EmptyStateItems({
  boxName,
  onCreateItem,
  children,
}: EmptyStateItemsProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <Package2 className="h-8 w-8 text-muted-foreground" />
      </div>

      <h3 className="mb-2 font-semibold text-foreground text-lg">
        {boxName ? `Caixa "${boxName}" está vazia` : 'Nenhum item encontrado'}
      </h3>

      <p className="mb-6 max-w-sm text-muted-foreground text-sm">
        {boxName
          ? `Adicione componentes eletrônicos à caixa "${boxName}" para começar a organizar seu estoque.`
          : 'Selecione uma caixa de armazenamento para ver os itens ou adicione novos componentes.'}
      </p>

      {children || (
        <Button className="gap-2" onClick={onCreateItem}>
          <PlusCircle className="h-4 w-4" />
          Adicionar primeiro item
        </Button>
      )}

      <div className="mt-8 text-muted-foreground text-xs">
        💡 Dica: Mantenha informações detalhadas como modelo, quantidade e
        localização
      </div>
    </div>
  )
}
