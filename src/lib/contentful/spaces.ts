export type SpaceConfig = {
  spaceId: string;
  environment: string;
  deliveryToken: string;
  previewToken: string;
};

function readSpace(prefix: 'EVENTS' | 'MAIN'): SpaceConfig {
  const spaceId = process.env[`CONTENTFUL_${prefix}_SPACE_ID`];
  const environment = process.env[`CONTENTFUL_${prefix}_ENVIRONMENT`];
  const deliveryToken = process.env[`CONTENTFUL_${prefix}_DELIVERY_TOKEN`];
  const previewToken = process.env[`CONTENTFUL_${prefix}_PREVIEW_TOKEN`];

  if (!spaceId || !environment || !deliveryToken || !previewToken) {
    throw new Error(
      `Missing Contentful env vars for space "${prefix}". Check .env.local against .env.example.`
    );
  }

  return { spaceId, environment, deliveryToken, previewToken };
}

export const eventsSpace = readSpace('EVENTS');
export const mainSpace = readSpace('MAIN');
