import { z } from 'zod';

const GenUINodeSchema: z.ZodTypeAny = z.lazy(() =>
  z
    .object({
      type: z.string().min(1).max(128),
      props: z.record(z.unknown()).optional(),
      children: z.array(GenUINodeSchema).optional(),
      id: z.string().max(256).optional(),
    })
    .strict()
);

const ActionDefSchema: z.ZodTypeAny = z.lazy(() =>
  z.discriminatedUnion('type', [
    z.object({ type: z.literal('SET_STATE'), path: z.string().min(1).max(512), value: z.unknown() }).strict(),
    z.object({ type: z.literal('MERGE_STATE'), patch: z.record(z.unknown()) }).strict(),
    z
      .object({
        type: z.literal('API_CALL'),
        id: z.string().optional(),
        url: z.string().min(1).max(2048),
        method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']).optional(),
        headers: z.record(z.string()).optional(),
        body: z.unknown().optional(),
        onSuccess: z.object({ chain: z.array(ActionDefSchema) }).strict().optional(),
        onError: z.object({ chain: z.array(ActionDefSchema) }).strict().optional(),
      })
      .strict(),
    z.object({ type: z.literal('NAVIGATE'), path: z.string().min(1).max(2048) }).strict(),
    z.object({ type: z.literal('CUSTOM'), name: z.string().min(1).max(128), payload: z.unknown().optional() }).strict(),
    z.object({ type: z.literal('CHAIN'), chain: z.array(ActionDefSchema) }).strict(),
  ])
);

export const GenUIDocumentSchema = z
  .object({
    version: z.string().optional(),
    ui: GenUINodeSchema,
    state: z.record(z.unknown()),
    bindings: z.record(z.string()).optional(),
    actions: z.record(ActionDefSchema).optional(),
    /** @see GenUIDocument.onMountAction */
    onMountAction: z.string().min(1).max(128).optional(),
  })
  .strict();

export type ValidatedGenDocument = z.infer<typeof GenUIDocumentSchema>;

export function parseGenUIDocument(json: unknown) {
  return GenUIDocumentSchema.safeParse(json);
}
