interface SerializedError {
  success: false;
  message: string;
}

export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class ErrorResponse extends Error {
  constructor(public readonly error: Error) {
    super(error?.message ?? error ?? "SERVERSIDE_ERROR_OCCURED");
    Object.setPrototypeOf(this, ErrorResponse.prototype);
  }

  get statusCode(): number {
    switch (true) {
      case this.error instanceof ValidationError:
        return 203;
      case this.error instanceof BadRequestError:
        return 400;
      case this.error instanceof AuthenticationError:
        return 401;
      case this.error instanceof NotFoundError:
        return 404;
      default:
        return 202; // previously had 500 and to handle errors in axios, this is changed to 202
    }
  }

  serializeError(): SerializedError {
    return { success: false, message: this.message };
  }
}
