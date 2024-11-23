
class Node{
    constructor(value, left= null, right=null){
        this.value = value;
        this.right = right;
        this.left = left;
    }
}

class Tree{
    constructor(arr =[]){
        const sortedArray = [...new Set(arr.sort((a, b) => a - b))];
        this.root = this.buildTree(sortedArray);
    }

    buildTree(array){
        if(array.length ===0) return null;

        let middle = Math.floor(array.length / 2);
        const root = new Node(array[middle]);
        root.left = this.buildTree(array.slice(0, middle));
        root.right = this.buildTree(array.slice(middle + 1));

        return root;
    }

    insert(value){
        let currNode = this.root;
        const newNode = new Node(value);
        while(currNode){
                if(currNode.value === value){
                    return; //value already exists
                }
                if(currNode.value > value){
                    if(currNode.left){
                        currNode = currNode.left;
                        continue;
                    }else{
                        currNode.left = newNode;
                        return;
                    }
                }

                if(currNode.value < value){
                    if(currNode.right){
                        currNode = currNode.right;
                        continue;
                    }else{
                        currNode.right = newNode;
                        return;
                    }
                }
        }
}
    deleteItem(value){
        let parentNode = null;
        let currNode = this.root;
    
        while(currNode && currNode.value != value){
            parentNode = currNode;
            if(currNode.value > value){
                currNode = currNode.left;
                    
            }else{
                currNode = currNode.right;
                }
        }
        //value not found
        if(!currNode){
            return null;
        }

        //node is a leaf
        if(!currNode.left && !currNode.right){

            if (!parentNode) {
                // Deleting the root node
                this.root = null;
            } else if(parentNode.left === currNode){
                parentNode.left = null;
            }else{
                parentNode.right = null;
            }
            return true;
        }

        //node has two subtrees
        if(currNode.left && currNode.right){
            const succ = this.findSucc(currNode);
            currNode.value = succ.value;
            this.deleteItem(succ.value);
            return true;
        }

        //node has one child
        const child = currNode.left ? currNode.left : currNode.right;
        if (!parentNode) {
            // Deleting the root node
            this.root = child;
        } else if(parentNode.left === currNode){
            parentNode.left = child;
            }else{
                parentNode.right = child;
            }
            return true;        
    }

    // helper function to find the successor node of a value
    findSucc(node){
        if(!node || !node.right){
            return null;
        }

        let currNode = node.right
        while(currNode.left){
                currNode = currNode.left;
            }

        return currNode;
    }

    find(value){
        let currNode = this.root;
        while(currNode){
                if(currNode.value === value){
                    break; 
                }
                if(currNode.value > value){
                        currNode = currNode.left;
                        continue;
                }else{
                    currNode = currNode.right;
                    continue;
                    }
        }
        return currNode;
    }

    levelOrder(callback){
        if(!callback){
            throw new Error('Callback function is required');
        }

        // traverse tree
        let currNode;
        const nodeStack = [this.root];
        while(nodeStack.length > 0){
            currNode = nodeStack.shift();
            if(currNode.left){
                nodeStack.push(currNode.left);
            }
            if(currNode.right){
                nodeStack.push(currNode.right);
            }

            callback(currNode);
        }
    }
    // traverse the tree inorder and perform a given callback on each node
    inOrder(callback, node = this.root){
        if(!callback){
            throw new Error('Callback function is required');
        }

        if(!node){
            return;
        }
        this.inOrder(callback, node.left);
        callback(node);
        this.inOrder(callback, node.right);
    }

    preOrder(callback, node = this.root){
        if(!callback){
            throw new Error('Callback function is required');
        }

        if(!node){
            return;
        }
        callback(node);
        this.preOrder(callback, node.left);
        this.preOrder(callback, node.right);

    }

    postOrder(callback, node = this.root){
        if(!callback){
            throw new Error('Callback function is required');
        }

        if(!node){
            return;
        }
        this.postOrder(callback, node.left);
        this.postOrder(callback, node.right);
        callback(node);

    }
    

    height(node){
        if(!node){
            return -1;
        }

        return Math.max(this.height(node.left), this.height(node.right)) + 1;
    }

    depth(node){
        let currNode = this.root;
        let depth = -1;
        while(currNode){

            if(currNode.value === node.value){
                return depth;
            }
            if(node.value < currNode.value){
                currNode = currNode.left;
            }else{
                currNode = currNode.right;
            }

            depth += 1;
        }
        return null; //node isn't found
    }

    isBalanced(){
        
        let balanced = true;
        this.levelOrder((node) =>{
            balanced = balanced && Math.abs(this.height(node.left) - this.height(node.right)) <= 1;
        });
        return balanced;
 
    }

    rebalance(){
        const array = [];
        this.inOrder((node) =>{
            array.push(node.value);
        });

        this.root = this.buildTree(array);
    }

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
}
