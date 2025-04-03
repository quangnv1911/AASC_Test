import { z } from 'zod';

export function contactValidationMiddleware(req, res, next) {
    try {
        const contactData = req.body.data;

        // Define schemas for array items
        const phoneSchema = z.object({
            VALUE: z.string().optional(),
            TYPE_ID: z.string().optional()
        }).optional();

        const emailSchema = z.object({
            VALUE: z.string().optional(),
            TYPE_ID: z.string().optional()
        }).optional();

        const webSchema = z.object({
            VALUE: z.string().optional(),
            TYPE_ID: z.string().optional()
        }).optional();

        const addressSchema = z.object({
            ADDRESS_1: z.string().optional(),
            CITY: z.string().optional(),
            REGION: z.string().optional(),
            ID: z.string().optional()
        }).optional();

        const bankInfoSchema = z.object({
            RQ_BANK_NAME: z.string().optional(),
            RQ_ACC_NUM: z.string().optional(),
            ID: z.string().optional()
        }).optional();

        const schema = z.object({
            NAME: z.string().min(1, { message: "First name is required" }),
            LAST_NAME: z.string().min(1, { message: "Last name is required" }),
            PHONE: z.array(phoneSchema).optional().nullable(),
            WEB: z.array(webSchema).optional().nullable(),
            EMAIL: z.array(emailSchema).optional().nullable(),
            bankInfo: z.array(bankInfoSchema).optional().nullable(),
            address: z.array(addressSchema).optional().nullable(),
            requisite: z.object({}).optional().nullable(),
        });

        schema.parse(contactData);

        next();
    } catch (e) {
        if (e instanceof z.ZodError) {
            return res.status(400).json({
                success: false,
                errors: e.errors.map(err => ({
                    path: err.path.join('.'),
                    message: err.message
                })),
                errorName: 'ValidationError',
            });
        }
        console.log(e);
        return res.status(500).json({
            success: false,
            errors: ['An unexpected error occurred'],
            errorName: e.name || 'Error',
        });
    }
}
