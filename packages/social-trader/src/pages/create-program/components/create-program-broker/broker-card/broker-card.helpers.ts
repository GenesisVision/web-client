export const slugBrokerName = (name: string): string =>
  name.toLowerCase().replace(/\s+/g, "-");
