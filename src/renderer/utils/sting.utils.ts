export function kabobToCapitalCase(str: string): string {
  str = str?.replace('-', ' ')?.replace('_', ' ');
  return str;
}