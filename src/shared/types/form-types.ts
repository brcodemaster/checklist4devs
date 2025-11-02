import { z } from 'zod'

import { formSendMessageSchema } from '@/features/feedback/model'

export type TFormSendMessage = z.infer<typeof formSendMessageSchema>
