import { Request } from 'express';
import { z } from 'zod';

export const verifyTokenSchema = z.object({
  refreshToken: z.string().min(1, { message: 'Refresh token is required' }),
});

// TypeScript type inferred from Zod schema
type LoginSchemaType = z.infer<typeof verifyTokenSchema>;

// Ensuring the interface matches the schema type
export interface VerifyTokenRequest extends Request {
  body: LoginSchemaType;
}
