export const useCopyToClipboard = () => {
  return (value: any) => navigator.clipboard.writeText(value)
}
