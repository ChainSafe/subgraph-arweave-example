import { arweave, BigInt } from "@graphprotocol/graph-ts"
import { Block, Poa, Tag, Transaction } from "../generated/schema"

export function handleBlock(block: arweave.Block): void {
  let hash = block.indepHash.toHexString();
  let entity = new Block(hash);

  entity.height = BigInt.fromU64(block.height);
  entity.timestamp = BigInt.fromU64(block.timestamp);
  entity.indep_hash = block.indepHash;
  entity.nonce = block.nonce;
  entity.previous_block = block.previousBlock;
  entity.last_retarget = BigInt.fromU64(block.lastRetarget);
  entity.diff = block.diff;
  entity.hash = block.hash;
  entity.tx_root = block.txRoot;
  entity.txs = saveTxs(hash, block.txs);
  entity.wallet_list = block.walletList;
  entity.reward_addr = block.rewardAddr;
  entity.tags = saveTags(hash, block.tags);
  entity.reward_pool = block.rewardPool;
  entity.weave_size = block.weaveSize;
  entity.block_size = block.blockSize;
  entity.cumulative_diff = block.cumulativeDiff;
  entity.hash_list_merkle = block.hashListMerkle;
  entity.poa = savePoa(hash, block.poa)

  entity.save()
}


function savePoa(id: string, poa: arweave.ProofOfAccess): string {
  const p = new Poa(id);

  p.option = poa.option;
  p.chunk = poa.chunk;
  p.data_path = poa.dataPath;
  p.tx_path = poa.txPath;

  p.save();

  return id;
}

function saveTags(id: string, tags: arweave.Tag[]): string[] {
  for (let i =0; i <  tags.length; i ++) {
    const rawTag = tags[i];
    const tag = new Tag(id);

    tag.name = rawTag.name;
    tag.value = rawTag.value;

    tag.save();
  }

  return new Array<string>(tags.length).fill(id);
}


function saveTxs(hash: string, txs: arweave.Transaction[]): string[] {
  let ids = new Array<string>();
  for (let i = 0; i < txs.length; i++) {
    const rawTx = txs[i];
    const id = rawTx.id.toHexString();
    const tx = new Transaction(id);

    tx.tx_id = rawTx.id;
    tx.last_tx = rawTx.lastTx;
    tx.owner = rawTx.owner;
    tx.tags = saveTags(rawTx.id.toHexString(), rawTx.tags);
    tx.data = rawTx.data;
    tx.data_root = rawTx.dataRoot;
    tx.data_size = rawTx.dataSize;
    tx.target = rawTx.target;
    tx.quantity = rawTx.quantity;
    tx.signature = rawTx.signature;
    tx.reward = rawTx.reward;

    tx.save();
    ids.push(id);
  }

  return ids;
}
