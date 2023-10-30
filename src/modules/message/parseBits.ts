interface BitsType {
  bits: number
}

export type BitsInfoType = BitsType | object;

export const parseBits = (fields : any) : BitsInfoType => {
  const bits = Number(fields.bits ?? 0);

  if (!bits) {
    return {};
  }

  return {
    bits
  };
};
