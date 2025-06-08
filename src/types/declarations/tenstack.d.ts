import '@tanstack/vue-table'

declare module '@tanstack/vue-table' {
  // Тип поля meta в ColumnDef
  interface ColumnMeta<TData extends RowData, TValue> {
    thClass?: string
  }
}
