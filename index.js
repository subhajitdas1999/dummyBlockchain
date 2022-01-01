const SHA256 = require('crypto-js/sha256');

//this is for each block 
class BlockDetails{
    constructor(blockIndex,Tx){
        this.blockIndex = blockIndex;
        this.trancsactions = Tx;
        this.currentTime = new Date().toString();
        this.prevHash = "" ;
        this.blockHash = this.calculateHash();
        
    }
    //calculating the hash of block
    calculateHash(){
        return SHA256(this.blockIndex+this.trancsactions+this.currentTime+this.prevHash).toString();
    }
}


class Blockchain{
    // create the genesis block
    constructor(){
        this.allBlocksList = [this.initGenesisBlock()];
    }
    initGenesisBlock(){
        return new BlockDetails(0,"this is the first block of the chain");
    }

    //return the latest block of the chain
    latestBlock(){
        return this.allBlocksList[this.allBlocksList.length - 1];
    }

    //to add the new block in the chain
    addnewBlock(newBlock){
        newBlock.prevHash = this.latestBlock().blockHash ;
        newBlock.hash = newBlock.calculateHash();
        this.allBlocksList.push(newBlock);
    }

    //to check the block inetegrity
    chainValidity(){
        for(let i = 1 ; i < this.allBlocksList ; i++){
            const prevBlock = this.allBlocksList[i-1];
            const currentBlock = this.allBlocksList[i];

            //checking Block hash
            if (currentBlock.blockHash !== currentBlock.calculateHash()){
                   return false; 
            }

            //checking chain hash
            if(prevBlock.blockHash !== currentBlock.prevHash){
                return false;
            }
        }
        return true;
    }
}

const myBlockchain = new Blockchain();

myBlockchain.addnewBlock(new BlockDetails(1,{sender : "Subhajit",recipient:"bittu",coin:"3 bitjit"}));
myBlockchain.addnewBlock(new BlockDetails(2,{sender : "name1",recipient:"name2",coin:"4 bitjit"}));
myBlockchain.addnewBlock(new BlockDetails(3,{sender : "name2",recipient:"name3",coin:"13 bitjit"}));


console.log(JSON.stringify(myBlockchain,null,1));


