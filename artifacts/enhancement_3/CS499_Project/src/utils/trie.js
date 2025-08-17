// src/utils/trie.js
export default class TrieNode {
    constructor() {
        this.children = {};
        this.isEnd = false;
        this.ids = new Set();
    }
}

export class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word, id) {
        let node = this.root;
        for (const char of word.toLowerCase()) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
            node.ids.add(id);
        }
        node.isEnd = true;
    }

    searchPrefix(prefix) {
        let node = this.root;
        for (const char of prefix.toLowerCase()) {
            if (!node.children[char]) return new Set();
            node = node.children[char];
        }
        return node.ids
    }

    delete(word, id) {
        const deleteHelper = (node, word, depth = 0) => {
            if (!node) return false;
            node.ids.delete(id);
            if (depth === word.length) {
                node.isEnd = false;
                return Object.keys(node.children).length === 0 && node.ids.size === 0;
            }
            const char = word[depth].toLowerCase();
            const child = node.children[char];
            const shouldDeleteChild = deleteHelper(child, word, depth + 1);
            if (shouldDeleteChild) {
                delete node.children[char];
                return Object.keys(node.children).length === 0 && node.ids.size === 0;
            }
            return false;
        };
        deleteHelper(this.root, word, 0);
    }
}
