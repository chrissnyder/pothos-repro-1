import builder from "./builder";

const ref = builder.objectRef<{ cash: number }>("TestObject");
ref.implement({
  fields: (t) => ({
    cash: t.exposeMoney("cash"),
  }),
});

builder.queryFields((t) => ({
  hello: t.string({
    args: {
      name: t.arg.string(),
    },
    resolve: (_, { name }) => `hello, ${name || "World"}`,
  }),
  account: t.field({
    resolve: () => ({
      cash: 100,
    }),
    type: ref,
  }),
}));
