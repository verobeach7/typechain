import crypto from "crypto";

interface BlockShape {
  hash: string;
  prevHash: string;
  height: number;
  data: string;
}

class Block implements BlockShape {
  public hash: string;
  constructor(
    public prevHash: string,
    public height: number,
    public data: string
  ) {
    this.hash = Block.calculateHash(prevHash, height, data);
  }
  static calculateHash(prevHash: string, height: number, data: string) {
    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash("sha256").update(toHash).digest("hex");
  }
}

class Blockchain {
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }
  private getPrevHash() {
    if (this.blocks.length === 0) return "";
    return this.blocks[this.blocks.length - 1].hash;
  }
  public addBlock(data: string) {
    const newBlock = new Block(
      this.getPrevHash(),
      this.blocks.length + 1,
      data
    );
    this.blocks.push(newBlock);
  }
  public getBlocks() {
    return [...this.blocks]; // 배열 안에 있는 데이터를 가진 새로운 배열을 리턴, 이렇게 함으로써 블록체인의 State와 연결되지 않음!!!
    // return this.blocks; // 이렇게 하면 원본 배열을 리턴하여 유저가 해킹을 할 수 있음
  }
}

const blockchain = new Blockchain();

blockchain.addBlock("First one");
blockchain.addBlock("Second one");
blockchain.addBlock("Third one");

// getBlocks의 return 값으로 원본 배열을 리턴하면 이렇게 해킹할 수 있음
blockchain.getBlocks().push(new Block("xxx", 111, "You Hacked!"));

console.log(blockchain.getBlocks());
