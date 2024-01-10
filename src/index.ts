// 1. d.ts로 js패키지 type 지정 관련
// import { init, exit } from "myPackage";

// init({
//   url: "true",
// });

// exit(1);

// 2. allowJS(tsconfig.json) + JsDoc로 type 지정
// 단, 동일한 이름의 js와 d.ts파일이 있을 시 module을 못찾음...
// -> File '~/src/myPackage.d.ts' is not a module.ts(2306)
// 그래서 d.ts파일 자체의 이름을 바꿔줘야 오류가 없어짐
// import { init, exit } from "./myPackage";

// init({
//   debug: true, url: "true",
// });

// esModuleInterop 관련
// import * as crypto from "crypto"

import crypto from "crypto";
// ts로 만들어지지 않은 패키지를 쓰고 싶은데 복잡한 타입정의 직접 하기 싫을때
// definitelytyped : https://github.com/DefinitelyTyped/DefinitelyTyped
// 여기에 개발자들이 엥간한 패키지의 타입정의를 해둠
// npm i -D @types/{패키지이름}를 통해 타입정의 설치 가능
// npm i -D @types/node를 통해서 전체 설치 가능

interface BlockShape {
  hash: string;
  prevHash: string;
  // 블록 위치 표시
  height: number;
  data: string;
}

class Block implements BlockShape {
  // block의 hash값은 prevHash, height, data값을 이용해서 계산됨

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

class BlockChain {
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
    // 아래 코드대로면 해킹의 위험이 있음
    // 그냥 배열내에 접근해서 임의의 값push가 가능한 상태(수정 가능한 상태)
    // return this.blocks;

    // 독립적인 복사본을 반환하므로 원래의 블록체인에 영향을 미치지 않음
    return [...this.blocks];
  }
}

const blockchain = new BlockChain();
blockchain.addBlock("first one");
blockchain.addBlock("second one");
blockchain.addBlock("third one");

// 무결성 침해
blockchain.getBlocks().push(new Block("XXXXXX", 1111, "HACKED!!!!!!"));

console.log(blockchain.getBlocks());
