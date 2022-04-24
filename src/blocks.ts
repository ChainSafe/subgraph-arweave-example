import { arweave, BigInt } from "@graphprotocol/graph-ts"
import { Block } from "../generated/schema"

export function handleBlock(block: arweave.Block): void {
  let entity = new Block(block.indepHash.toHexString())

  entity.save()
}
