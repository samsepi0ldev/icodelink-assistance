import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs'

export function useSearchFilter() {
  return useQueryStates({
    name: parseAsString.withDefault(''),
    page: parseAsInteger.withDefault(1),
    box: parseAsInteger.withDefault(0),
  })
}
