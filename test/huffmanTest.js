class Node {
  constructor(value, frequency, left = null, right = null) {
    this.value = value;
    this.frequency = frequency;
    this.left = left;
    this.right = right;
  }
}

function buildFrequencyTable(data) {
  if (!data) throw new Error("Input data is empty or undefined");
  const freq = {};
  for (const char of data) {
    freq[char] = (freq[char] || 0) + 1;
  }
  return freq;
}

function buildHuffmanTree(freqTable) {
  const nodes = Object.entries(freqTable).map(([char, freq]) => new Node(char, freq));
  while (nodes.length > 1) {
    nodes.sort((a, b) => a.frequency - b.frequency);
    const left = nodes.shift();
    const right = nodes.shift();
    const merged = new Node(null, left.frequency + right.frequency, left, right);
    nodes.push(merged);
  }
  return nodes[0];
}

function buildCodeTable(node, prefix = '', codeTable = {}) {
  if (!node.left && !node.right) {
    codeTable[node.value] = prefix || '0';
  } else {
    if (node.left) buildCodeTable(node.left, prefix + '0', codeTable);
    if (node.right) buildCodeTable(node.right, prefix + '1', codeTable);
  }
  return codeTable;
}

function compressData(data, codeTable) {
  if (!data || !codeTable) throw new Error("Invalid input or code table");
  return data.split('').map(char => codeTable[char]).join('');
}

function decompressData(compressed, tree) {
  if (!compressed && tree.value) {
    return tree.value.repeat(tree.frequency);
  }

  let result = '';
  let node = tree;
  for (const bit of compressed) {
    node = bit === '0' ? node.left : node.right;
    if (!node.left && !node.right) {
      result += node.value;
      node = tree;
    }
  }
  return result;
}

module.exports = {
  huffman: {
    Node,
    buildFrequencyTable,
    buildHuffmanTree,
    buildCodeTable,
    compressData,
    decompressData
  }
};
