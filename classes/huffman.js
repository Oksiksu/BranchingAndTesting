//Huffman
class HuffmanCode {
    static buildFrequencyTable(data) {
        const frequencyTable = {};

        for (let i = 0; i < data.length; i++) {
            const symbol = data[i];
            if (frequencyTable[symbol]) {
                frequencyTable[symbol]++;
            } else {
                frequencyTable[symbol] = 1;
            }
        }

        return frequencyTable;
    }

    static buildHuffmanTree(frequencyTable) {
        class Node {
            constructor(value, frequency) {
                this.value = value;
                this.frequency = frequency;
                this.left = null;
                this.right = null;
            }
        }

        const priorityQueue = [];
        for (const symbol in frequencyTable) {
            const frequency = frequencyTable[symbol];
            const node = new Node(symbol, frequency);
            priorityQueue.push(node);
        }

        while (priorityQueue.length > 1) {
            priorityQueue.sort((a, b) => a.frequency - b.frequency);
            const leftNode = priorityQueue.shift();
            const rightNode = priorityQueue.shift();

            const parentNode = new Node(null, leftNode.frequency + rightNode.frequency);
            parentNode.left = leftNode;
            parentNode.right = rightNode;

            priorityQueue.push(parentNode);
        }

        return priorityQueue[0];
    }


    static buildCodeTable(huffmanTree, code = '', codeTable = {}) {
        if (!huffmanTree.left && !huffmanTree.right) {
            codeTable[huffmanTree.value] = code;
            return codeTable;
        }

        this.buildCodeTable(huffmanTree.left, code + '0', codeTable);
        this.buildCodeTable(huffmanTree.right, code + '1', codeTable);

        return codeTable;
    }

    static compressData(data, codeTable) {
        let compressedData = '';
        for (let i = 0; i < data.length; i++) {
            const symbol = data[i];
            compressedData += codeTable[symbol];
        }
        return compressedData;
    }

    static decompressData(compressedData, huffmanTree) {
        let decompressedData = '';
        let currentNode = huffmanTree;

        for (let i = 0; i < compressedData.length; i++) {
            const bit = compressedData[i];
            if (bit === '0') {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }

            if (!currentNode.left && !currentNode.right) {
                decompressedData += currentNode.value;
                currentNode = huffmanTree;
            }
        }

        return decompressedData;
    }

        /**
     * Обчислює коефіцієнт стиснення
     * @param {string} originalData - Нестиснені дані (рядок)
     * @param {string} compressedData - Стиснені дані у вигляді бітів (рядок)
     * @returns {number} Коефіцієнт стиснення = originalSize / compressedSize*/
     
        static calculateCompressionRatio(originalData, compressedData) {
            const originalSize = originalData.length * 8;
            const compressedSize = compressedData.length;
            return originalSize / compressedSize;
        }
    
}

module.exports = HuffmanCode;
