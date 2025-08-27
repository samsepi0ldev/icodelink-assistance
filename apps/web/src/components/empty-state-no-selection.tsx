import { ArrowLeft, FolderOpen } from 'lucide-react'

export function EmptyStateNoSelection() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <FolderOpen className="h-8 w-8 text-muted-foreground" />
      </div>

      <h3 className="mb-2 font-semibold text-foreground text-lg">
        Selecione uma caixa de armazenamento
      </h3>

      <p className="mb-6 max-w-sm text-muted-foreground text-sm">
        Escolha uma caixa na barra lateral para visualizar e gerenciar os
        componentes armazenados.
      </p>

      <div className="flex items-center gap-2 text-muted-foreground text-xs">
        <ArrowLeft className="h-4 w-4" />
        Clique em uma caixa para começar
      </div>
    </div>
  )
}
