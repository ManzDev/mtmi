export interface BitsInfoType {
  bits: number
}

export type BitsGroupType = BitsInfoType | object;

export const parseBits = (fields : any) : BitsGroupType => {
  const bits = Number(fields.bits ?? 0);

  if (!bits) {
    return {};
  }

  return {
    bits
  };
};
