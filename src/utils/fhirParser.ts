import type { ParsedFhirResources } from '../types/m3.types';

const collectEntries = (bundle: any): any[] => {
  if (!bundle || !Array.isArray(bundle.entry)) {
    return [];
  }

  const flatEntries: any[] = [];

  bundle.entry.forEach((entry: any) => {
    const resource = entry?.resource;

    if (!resource) {
      return;
    }

    if (
      resource.resourceType === 'Bundle' &&
      Array.isArray(resource.entry)
    ) {
      flatEntries.push(...collectEntries(resource));
      return;
    }

    flatEntries.push({ resource });
  });

  return flatEntries;
};

export const getFhirEntries = (bundle: any) => {
  if (!bundle) return [];

  return collectEntries(bundle);
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