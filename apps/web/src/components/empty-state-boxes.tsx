import { Lightbulb, Package, PlusCircle } from 'lucide-react'

type EmptyStateBoxesProps = {
  children?: React.ReactNode
}

export function EmptyStateBoxes({ children }: EmptyStateBoxesProps) {
  return (
    <div className="mx-auto flex max-w-sm flex-col items-center justify-center px-4 py-12 text-center">
      <div className="relative mb-6">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 shadow-sm dark:from-blue-950 dark:to-indigo-900">
          <Package className="h-10 w-10 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="-top-1 -right-1 absolute flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900">
          <PlusCircle className="h-3 w-3 text-orange-600 dark:text-orange-400" />
        </div>
      </div>

      <h3 className="mb-3 font-semibold text-foreground text-xl">
        Nenhuma caixa de armazenamento
      </h3>

      <p className="mb-8 text-muted-foreground text-sm leading-relaxed">
        Organize seus componentes eletrônicos criando caixas de armazenamento.
        <br />
        <span className="font-medium text-foreground">
          Que tal criar sua primeira caixa agora?
        </span>
      </p>

      {children}

      <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-950/30">
        <div className="flex items-start gap-2 text-amber-700 text-xs dark:text-amber-300">
          <Lightbulb className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>
            <strong>Dica:</strong> Use caixas para organizar por categoria,
            projeto ou localização física
          </span>
        </div>
      </div>
    </div>
  )
}
