import { CanvasClient } from "@uniformdev/canvas";
import { Composition } from "@uniformdev/canvas-react";
import LayoutCanvas from "../src/components/LayoutCanvas";

import content from "../lib/content.json";
import doEnhance from "../lib/enhancer";
import resolveRenderer from "../lib/resolveRenderer";

async function getComposition(slug) {
  const client = new CanvasClient({
    apiKey: process.env.UNIFORM_API_KEY,
    projectId: process.env.UNIFORM_PROJECT_ID,
    apiHost: process.env.UNIFORM_CLI_BASE_URL,
  });
  const { composition } = await client.getCompositionBySlug({
    slug,
  });
  return composition;
}

export async function getStaticProps() {
  const slug = "/";
  const topic = content.find((e) => e.url == slug);

  const composition = await getComposition(slug);

  await doEnhance(composition);

  //
  //Return props for the home page that
  //include the composition and content
  //required by the page components.
  return {
    props: {
      composition,
      fields: topic.fields,
    },
  };
}

export default function Home({ composition, fields }) {
  return (
    <Composition data={composition} resolveRenderer={resolveRenderer}>
        <LayoutCanvas composition={composition} fields={fields} />
    </Composition>
  );
}
