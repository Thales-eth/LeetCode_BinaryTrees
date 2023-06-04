// DFS PROBLEMS

// Given a binary tree, find its minimum depth.

// The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

// Note: A leaf is a node with no children.

// Example 1:

// Input: root = [3,9,20,null,null,15,7]
// Output: 2

function minDepth(root) {
    if (!root) return 0
    ans = Infinity
    function dfs(node, curr) {
        if (!node) return null
        if (!node.left && !node.right) {
            ans = Math.min(ans, curr + 1)
            return
        }
        dfs(node.left, curr + 1)
        dfs(node.right, curr + 1)
    }
    dfs(root, 0)
    return ans
}

// Given the root of a binary tree, find the maximum value v for which there exist different nodes a and b where v = |a.val - b.val| and a is an ancestor of b.

// A node a is an ancestor of b if either: any child of a is equal to b or any child of a is an ancestor of b.

// Example 1:

// Input: root = [8,3,10,1,6,null,14,null,null,4,7,13]
// Output: 7
// Explanation: We have various ancestor-node differences, some of which are given below :
// |8 - 3| = 5
// |3 - 7| = 4
// |8 - 1| = 7
// |10 - 13| = 3
// Among all possible differences, the maximum value of 7 is obtained by |8 - 1| = 7.

// https://leetcode.com/problems/maximum-difference-between-node-and-ancestor/description/

function maxAncestorDiff(root) {
    let ans = 0
    function dfs(curr, max, min) {
        if (!curr) return
        max = Math.max(max, curr.val)
        min = Math.min(min, curr.val)
        ans = Math.max(ans, (max - min))
        dfs(curr.left, max, min)
        dfs(curr.right, max, min)
    }
    dfs(root, -Infinity, Infinity)
    return ans
}

// Given the root of a binary tree, return the length of the diameter of the tree.

// The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

// The length of a path between two nodes is represented by the number of edges between them.

// Example 1:

// Input: root = [1,2,3,4,5]
// Output: 3
// Explanation: 3 is the length of the path [4,2,1,3] or [5,2,1,3].

// https://leetcode.com/problems/diameter-of-binary-tree/description/

function diameterOfBinaryTree(root) {
    if (!root) return 0
    let ans = 0
    function dfs(node, curr) {
        if (!node) return 0
        if (!node.left && !node.right) return curr
        const left = dfs(node.left, curr + 1)
        const right = dfs(node.right, curr + 1)
        if (left && right || node === root) ans = Math.max(ans, left - curr + right - curr)
        return Math.max(left, right)
    }
    dfs(root, 0)
    return ans
}

// BFS PROBLEMS

// Given the root of a binary tree, return the sum of values of its deepest leaves.

// Example 1:

// Input: root = [1,2,3,4,5,null,6,7,null,null,null,null,8]
// Output: 15

// https://leetcode.com/problems/deepest-leaves-sum/description/

function deepestLeavesSum(root) {
    if (!root) return 0
    let ans = 0
    let queue = [root]

    while (queue.length) {
        const hasEnded = queue.every(node => (!node.left && !node.right))
        if (hasEnded) {
            for (node of queue) {
                ans += node.val
            }
            return ans
        }

        const localQueue = []
        for (let i = 0; i < queue.length; i++) {
            const node = queue[i]
            if (node.left) localQueue.push(node.left)
            if (node.right) localQueue.push(node.right)
        }
        queue = localQueue

    }
    return ans
}

// Given the root of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between).

// Example 1:

// Input: root = [3,9,20,null,null,15,7]
// Output: [[3],[20,9],[15,7]]

// https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/description/

function zigzagLevelOrder(root) {
    if (!root) return []
    let ans = [[root.val]]
    let level = 0
    let queue = [root]
    while (queue.length) {
        const localQueue = []
        for (let i = 0; i < queue.length; i++) {
            const node = queue[i]
            if (node.left) localQueue.push(node.left)
            if (node.right) localQueue.push(node.right)
        }
        if (!localQueue.length) return ans
        const localValues = localQueue.map(node => node.val)
        if (level % 2 === 0) localValues.reverse()
        ans.push(localValues)
        queue = localQueue
        level++
    }
    return ans
}

// BINARY SEARCH TREES

// You are given the root node of a binary search tree (BST) and a value to insert into the tree. Return the root node of the BST after the insertion. It is guaranteed that the new value does not exist in the original BST.

// Notice that there may exist multiple valid ways for the insertion, as long as the tree remains a BST after insertion. You can return any of them.

// Example 1:

// Input: root = [4,2,7,1,3], val = 5
// Output: [4,2,7,1,3,5]

// https://leetcode.com/problems/insert-into-a-binary-search-tree/description/

function insertIntoBST(root, val) {
    if (!root) return new TreeNode(val)
    if (val > root.val) root.right = insertIntoBST(root.right, val)
    else if (val < root.val) root.left = insertIntoBST(root.left, val)
    return root
}

// Given the root of a binary search tree and a target value, return the value in the BST that is closest to the target. If there are multiple answers, print the smallest.

// Example 1:

// Input: root = [4,2,5,1,3], target = 3.714286
// Output: 4

// https://leetcode.com/problems/closest-binary-search-tree-value/description/

function closestValue(root, target) {
    let maxNumber = 0
    let minDifference = Infinity

    function dfs(node, target) {
        if (!node) return
        const difference = Math.abs(node.val - target)
        if (difference < minDifference || difference === minDifference && node.val < maxNumber) {
            minDifference = difference
            maxNumber = node.val
        }
        if (target < node.val) dfs(node.left, target)
        if (target > node.val) dfs(node.right, target)

    }
    dfs(root, target)
    return maxNumber
}