import SchemaBuilder, {
  type ParentShape,
  type SchemaTypes,
  ObjectFieldBuilder,
} from "@pothos/core";
import { ImplementableLoadableObjectRef } from "@pothos/plugin-dataloader";
import currency from "currency.js";

const schemaBuilderProto =
  SchemaBuilder.prototype as PothosSchemaTypes.SchemaBuilder<SchemaTypes>;

const moneyObjectRefMap = new WeakMap<
  PothosSchemaTypes.SchemaBuilder<SchemaTypes>,
  ImplementableLoadableObjectRef<
    SchemaTypes,
    string | ReturnType<typeof currency>,
    ReturnType<typeof currency>,
    string,
    string
  >
>();
schemaBuilderProto.moneyObjectRef = function moneyObjectRef() {
  if (moneyObjectRefMap.has(this)) {
    return moneyObjectRefMap.get(this)!;
  }

  const ref = this.loadableObjectRef<
    ReturnType<typeof currency>,
    string,
    string
  >("LoadableObjectRefTest", {
    load: (keys) => {
      return Promise.all(keys.map((k) => currency(k)));
    },
  });

  moneyObjectRefMap.set(this, ref);

  ref.implement({
    fields: (t) => ({
      amount: t.field({
        resolve: (src) => src.toString(),
        type: "String",
      }),
      asCents: t.field({
        resolve: (src) => src.intValue,
        type: "Int",
      }),
      formatted: t.field({
        resolve: (src) => src.format(),
        type: "String",
      }),
      value: t.field({
        resolve: (src) => src.value,
        type: "Float",
      }),
    }),
  });

  return ref;
};

const objectFieldBuilderProto =
  ObjectFieldBuilder.prototype as PothosSchemaTypes.ObjectFieldBuilder<
    SchemaTypes,
    ParentShape<SchemaTypes, unknown>
  >;

objectFieldBuilderProto.exposeMoney = function (name, ...args) {
  const [options] = args;
  return this.field({
    ...options,
    resolve: (src) => {
      return currency(src[name], { fromCents: true }) as never;
    },
    type: this.builder.moneyObjectRef(),
  });
};
