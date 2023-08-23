import SchemaBuilder from "@pothos/core";
import DataloaderPlugin from "@pothos/plugin-dataloader";

import MoneyPlugin from "./plugin/money";

export const builder = new SchemaBuilder<{}>({
  plugins: [DataloaderPlugin, MoneyPlugin],
});

export default builder;
