export interface Config {
  perPage: number;
}

export const useConfig = (): Config => {
  return {
    perPage: 50,
  };
};
