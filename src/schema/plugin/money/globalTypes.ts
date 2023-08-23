import type {
  CompatibleTypes,
  ExposeNullability,
  FieldNullability,
  FieldOptionsFromKind,
  FieldRef,
  NormalizeArgs,
  SchemaTypes,
} from "@pothos/core";
import type { ImplementableLoadableObjectRef } from "@pothos/plugin-dataloader";
import currency from "currency.js";

import type { PothosMoneyPlugin } from ".";

declare global {
  export namespace PothosSchemaTypes {
    export interface Plugins<Types extends SchemaTypes> {
      money: PothosMoneyPlugin<Types>;
    }

    export interface SchemaBuilder<Types extends SchemaTypes> {
      moneyObjectRef: () => ImplementableLoadableObjectRef<
        Types,
        string | ReturnType<typeof currency>,
        ReturnType<typeof currency>,
        string,
        string
      >;
    }

    export interface RootFieldBuilder<
      Types extends SchemaTypes,
      ParentShape extends unknown
    > {
      exposeMoney: <
        Name extends CompatibleTypes<Types, ParentShape, "Int", true>,
        ResolveReturnShape extends ReturnType<typeof currency>,
        Nullable extends FieldNullability<"Int"> = Types["DefaultFieldNullability"]
      >(
        name: Name,
        ...args: NormalizeArgs<
          [
            options: Omit<
              FieldOptionsFromKind<
                Types,
                ParentShape,
                "Int",
                Nullable,
                {},
                "Object",
                ParentShape,
                ResolveReturnShape
              >,
              "resolve" | "type" | "nullable"
            > &
              ExposeNullability<Types, "Int", ParentShape, Name, Nullable>
          ]
        >
      ) => FieldRef;
    }
  }
}
