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

    flatEntries.push({ resource, fullUrl: entry?.fullUrl });
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
  const seenResourceKeys = new Set<string>();
  const duplicateCounts = new Map<string, number>();

  const getResourceIdentity = (entry: any) => {
    const resource = entry?.resource;
    const resourceType = resource?.resourceType;

    if (!resourceType) {
      return null;
    }

    if (resource?.id) {
      return `${resourceType}/${resource.id}`;
    }

    if (entry?.fullUrl) {
      return `${resourceType}@${entry.fullUrl}`;
    }

    return null;
  };

  entries.forEach((entry: any) => {

    const resource = entry.resource;

    if (!resource?.resourceType) {
      return;
    }

    if (!resources[resource.resourceType]) {
      resources[resource.resourceType] = [];
    }

    const identity = getResourceIdentity(entry);

    if (identity && seenResourceKeys.has(identity)) {
      duplicateCounts.set(
        identity,
        (duplicateCounts.get(identity) ?? 1) + 1
      );
      return;
    }

    if (identity) {
      seenResourceKeys.add(identity);
      duplicateCounts.set(identity, 1);
    }

    resources[resource.resourceType].push(resource);

  });

  const duplicatedResources = Array.from(duplicateCounts.entries()).filter(
    ([, count]) => count > 1
  );

  if (duplicatedResources.length > 0) {
    console.warn("Duplicate exists in incoming FHIR Bundle.", {
      duplicates: duplicatedResources.map(([identity, count]) => ({
        identity,
        occurrences: count,
      })),
    });
  }

  return resources;

};