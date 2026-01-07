import { z } from "zod";

const isoDateFormat = /^\d{4}-(0\d|1[12])-([012]\d|3[01])$/;
const norwegianDateFormat = /^([012]\d|3[01])\.(0\d|1[12])\.\d{4}$/;

export const DateSchema = z
	.string()
	.refine(
		(dato) => isoDateFormat.test(dato) || norwegianDateFormat.test(dato),
		{
			message: "Should be either ISO or Norwegian date",
		},
	);
