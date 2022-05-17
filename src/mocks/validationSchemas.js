import { array, object, string } from "yup";

export function isValidDateString(str) {
  const DATE_VALIDATION_REGEX = /^\d{4}-[0-1]\d-[0-3]\d$/;
  const isFormattedCorrectly = str.match(DATE_VALIDATION_REGEX);

  if (!isFormattedCorrectly) {
    return false;
  }

  const asDate = new Date(str);

  return asDate instanceof Date && !isNaN(asDate.getDate());
}

export const personSchema = object({
  firstName: string().required().trim().min(1),
  lastName: string().required().trim().min(1),
  favoriteBooks: array().required().of(string()),
  email: string().email().required(),
  gender: string()
    .required()
    .matches(/^Male$|^Female$|^Genderfluid$/),
  address: object({
    country: string().required(),
    streetName: string().required(),
    postalCode: string().required(),
    city: string().required(),
  }),
  title: string().required().trim().min(2),
  favoriteColor: string()
    .required()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
      message: "favoriteColor has to be a valid Hex Color",
    }),
  birthday: string()
    .required()
    .test(
      "is-valid-date-format",
      // eslint-disable-next-line no-template-curly-in-string
      "${path} has to be a valid date in format 'yyyy-mm-dd'",
      async (birthday) => isValidDateString(birthday)
    ),
  comment: string().default(() => ""),
});