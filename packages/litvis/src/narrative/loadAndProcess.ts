import { Cache, LitvisDocument, LitvisNarrative } from "../types";
import applySchemaToLabels from "./applySchemaToLabels";
import extractComposedNarrativeSchema from "./extractComposedNarrativeSchema";
import extractElmEnvironmentSpec from "./extractElmEnvironmentSpec";
import load from "./load";
import processElmContexts from "./processElmContexts";

// @ts-ignore
// tslint:disable-next-line:no-implicit-dependencies
import { Parent, Position } from "unist";
// @ts-ignore
import { VFileBase } from "vfile";

export default async (
  filePath,
  filesInMemory: LitvisDocument[] = [],
  cache: Cache,
): Promise<LitvisNarrative> => {
  const narrative = await load(filePath, filesInMemory, cache);
  await extractElmEnvironmentSpec(narrative);
  await extractComposedNarrativeSchema(narrative);
  await processElmContexts(narrative, cache);
  await applySchemaToLabels(narrative);
  return narrative;
};
