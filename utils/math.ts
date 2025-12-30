/**
 * Converts a number to its Gray code representation.
 * Formula: num ^ (num >> 1)
 */
export const binaryToGray = (n: number): number => {
  return n ^ (n >> 1);
};

/**
 * Converts a Gray code to its binary number representation.
 * Iteratively XORs bits.
 */
export const grayToBinary = (gray: number): number => {
  let mask = gray >> 1;
  while (mask !== 0) {
    gray = gray ^ mask;
    mask = mask >> 1;
  }
  return gray;
};

/**
 * Pads a binary string with leading zeros to a specific length.
 */
export const padBinary = (bin: string, length: number): string => {
  return bin.padStart(length, '0');
};

/**
 * Generates the full sequence of Gray codes for n bits.
 */
export const generateGrayCodeSequence = (bits: number): number[] => {
  const count = 1 << bits; // 2^n
  const sequence: number[] = [];
  for (let i = 0; i < count; i++) {
    sequence.push(binaryToGray(i));
  }
  return sequence;
};

/**
 * Finds the index of the bit that differs between two numbers.
 * Returns -1 if numbers are equal. 0 is LSB.
 */
export const findChangedBit = (prev: number, curr: number): number => {
  let diff = prev ^ curr;
  if (diff === 0) return -1;
  let index = 0;
  while ((diff & 1) === 0) {
    diff >>= 1;
    index++;
  }
  return index;
};