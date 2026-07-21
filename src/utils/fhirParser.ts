import type { ParsedFhirResources } from '../types/m3.types';

export const getFhirEntries = (bundle: any) => {
  if (!bundle) return [];

  return bundle.entry?.[0]?.resource?.entry ?? [];
};


export const parseFhirBundle = (
  bundle: any
): ParsedFhirResources => {

  const entries = getFhirEntries(bundle);

  const resources: ParsedFhirResources = {};

  entries.forEach((entry: any) => {

    const resource = entry.resource;

    if (!resource?.resourceType) {
      return;
    }

    if (!resources[resource.resourceType]) {
      resources[resource.resourceType] = [];
    }

    resources[resource.resourceType].push(resource);

  });

  return resources;

};