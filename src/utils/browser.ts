/**
 * @fileoverview Утилиты, связанные с работой в браузере и его api
 */

import { toast } from 'vue-sonner'

export const copy = (id: string) => {
  navigator.clipboard.writeText(id).then(() => {
    toast.success('Скопировано!')
  })
}
