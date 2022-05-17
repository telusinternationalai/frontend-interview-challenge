// No need to change anything in this file

import { rest } from "msw";
import allPersons from "./personsFixtures";
import { isValidDateString, personSchema } from "./validationSchemas";

const PAGE_SIZE = 5;

const getAllPersonsHandler = rest.get("/persons", (req, res, ctx) => {
  let pageNumber = +req.url.searchParams.get("page") || 1;
  const start = (pageNumber - 1) * PAGE_SIZE;
  const stop = start + PAGE_SIZE;
  const page = allPersons.slice(start, stop).map((person) => {
    const { id, firstName, lastName, email, title } = person;
    return { id, firstName, lastName, email, title };
  });
  const hasNextPage = allPersons.length > stop;
  return res(ctx.status(200), ctx.json({ results: page, hasNextPage }));
});

const getPersonByIdHandler = rest.get("/persons/:id", (req, res, ctx) => {
  const { id } = req.params;
  const person = allPersons.find((person) => person.id === id);

  if (person) {
    return res(ctx.status(200), ctx.json(person));
  }

  return res(
    ctx.status(404),
    ctx.json({ errors: [`No person with id '${id}'`] })
  );
});

const postPersonHandler = rest.post("/persons", async (req, res, ctx) => {
  let newPerson;
  try {
    newPerson = await personSchema.validate(req.body);
  } catch (errors) {
    return res(ctx.status(200), ctx.json({ errors: errors.errors }));
  }

  allPersons.push(newPerson);
  return res(ctx.status(200), ctx.json(newPerson));
});

const patchPersonHandler = rest.patch("/persons/:id", (req, res, ctx) => {
  const { id } = req.params;
  const { firstName, lastName, birthday, comment } = req.body;

  if (!firstName && !lastName && !birthday && !comment) {
    return res(
      ctx.status(400),
      ctx.json({ errors: ["Empty updates are not allowed"] })
    );
  }

  if (birthday && !isValidDateString(birthday)) {
    return res(
      ctx.status(400),
      ctx.json({
        errors: ["Invalid birthday. Please use format 'yyyy-mm-dd'"],
      })
    );
  }

  const personToUpdate = allPersons.find((person) => person.id === id);

  if (!personToUpdate) {
    return res(ctx.status(400), ctx.json({ errors: ["No user with that ID"] }));
  }

  Object.assign(
    personToUpdate,
    firstName && { firstName },
    lastName && { lastName },
    birthday && { birthday },
    comment && { comment }
  );

  return res(ctx.status(200), ctx.json(personToUpdate));
});

const deletePersonHandler = rest.delete("/persons/:id", (req, res, ctx) => {
  const { id } = req.params;
  const indexToDelete = allPersons.findIndex((person) => person.id === id);
  allPersons.splice(indexToDelete, 1);

  return res(ctx.status(204));
});

export const handlers = [
  getAllPersonsHandler,
  getPersonByIdHandler,
  postPersonHandler,
  patchPersonHandler,
  deletePersonHandler,
];
