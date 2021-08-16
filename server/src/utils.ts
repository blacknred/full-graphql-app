import isEmail from "email-validator";

export function delay(ms = 1000): Promise<void> {
  return new Promise((r) => setInterval(r, ms));
}

export function inputValidation<Input extends Record<keyof Input, string>, Err>(
  fields: Input
): Err[] | null {
  const errors: Err[] = [];

  for (let field in fields) {
    switch (field) {
      case "username":
      case "password":
      case "usernameOrEmail":
      case "title":
      case "text":
        const min = field === "password" ? 6 : 3;
        if (fields[field].length < min) {
          errors.push({
            field,
            message: `Length must be greater than ${min}`,
          } as unknown as Err);
        }
        break;
      case "email":
        if (!isEmail.validate(fields[field])) {
          errors.push({
            field,
            message: "Empty or invalid email",
          } as unknown as Err);
        }
        break;
      default:
    }
  }

  return errors.length ? errors : null;
}
