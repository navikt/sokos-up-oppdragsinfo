export class HttpStatusCodeError extends Error {
	statusCode: number;

	constructor(statusCode: number, message: string) {
		super(message);
		this.statusCode = statusCode;
		this.name = "HttpStatusCodeError";
	}
}

// Kastes for feil som ikke er en spesifikk HTTP-statuskode appen skiller
// på (f.eks. nettverksfeil eller andre serverfeil enn 400).
export class ApiError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "ApiError";
	}
}
