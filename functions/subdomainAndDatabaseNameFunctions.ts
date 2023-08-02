export function subdomainToDatabaseName(subdomain: string) {
  return subdomain.replace(/-/g, "_");
}

export function databaseNameToSubdomain(databaseName: string) {
  return databaseName.replace(/_/g, "-");
}
