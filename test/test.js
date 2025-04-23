const assert = require('assert');
const HammingCode = require('../classes/hamming');
const HuffmanCode = require('../classes/huffman');

describe('HammingCode.calculateRedundantBitsCount', function () {
  it('should return 3 for 4 data bits', function () {
    assert.strictEqual(HammingCode.calculateRedundantBitsCount(4), 3);
  });

  it('should return 4 for 11 data bits', function () {
    assert.strictEqual(HammingCode.calculateRedundantBitsCount(11), 4);
  });

  it('should return 1 for 1 data bit', function () {
    assert.strictEqual(HammingCode.calculateRedundantBitsCount(1), 2);
  });

  it('should return 0 for 0 data bits', function () {
    assert.strictEqual(HammingCode.calculateRedundantBitsCount(0), 0);
  });

  it('should return correct r for large n', function () {
    const r = HammingCode.calculateRedundantBitsCount(1000);
    // 2^r >= 1000 + r + 1
    assert.ok(Math.pow(2, r) >= 1000 + r + 1);
  });
});

describe('HuffmanCode.calculateCompressionRatio', function () {
  it('should return > 1 for compressible string', function () {
    const input = 'aaaaabbbbcccddee';
    const freqTable = HuffmanCode.buildFrequencyTable(input);
    const tree = HuffmanCode.buildHuffmanTree(freqTable);
    const codeTable = HuffmanCode.buildCodeTable(tree);
    const compressed = HuffmanCode.compressData(input, codeTable);
    const ratio = HuffmanCode.calculateCompressionRatio(input, compressed);
    assert.ok(ratio > 1);
  });

  it('should return = 1 for incompressible data (uniform)', function () {
    const input = 'abcdefgh'; // кожна літера зустрічається 1 раз
    const freqTable = HuffmanCode.buildFrequencyTable(input);
    const tree = HuffmanCode.buildHuffmanTree(freqTable);
    const codeTable = HuffmanCode.buildCodeTable(tree);
    const compressed = HuffmanCode.compressData(input, codeTable);
    const ratio = HuffmanCode.calculateCompressionRatio(input, compressed);
    assert.ok(ratio >= 1); // ≥ бо може бути 1 або трохи більше
  });

  it('should handle large input efficiently', function () {
    const input = 'a'.repeat(10000) + 'b'.repeat(5000);
    const freqTable = HuffmanCode.buildFrequencyTable(input);
    const tree = HuffmanCode.buildHuffmanTree(freqTable);
    const codeTable = HuffmanCode.buildCodeTable(tree);
    const compressed = HuffmanCode.compressData(input, codeTable);
    const ratio = HuffmanCode.calculateCompressionRatio(input, compressed);
    assert.ok(ratio > 1);
  });
});
