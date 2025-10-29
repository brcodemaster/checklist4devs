import { z } from 'zod'

import { formSendMessageSchema } from '@/features/feedback/useFeedback'

export type TFormSendMessage = z.infer<typeof formSendMessageSchema>
