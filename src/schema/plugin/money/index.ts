import SchemaBuilder, { BasePlugin, SchemaTypes } from "@pothos/core";

import "./globalTypes";
import "./builders";

export * from "./types";

const pluginName = "money" as const;

export default pluginName;

export class PothosMoneyPlugin<
  Types extends SchemaTypes
> extends BasePlugin<Types> {}

SchemaBuilder.registerPlugin(pluginName, PothosMoneyPlugin);
