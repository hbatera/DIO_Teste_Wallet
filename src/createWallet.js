// importando as dependencias
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//definindo a rede
const network = bitcoin.networks.testnet

//derivação de carteira HD
const path = `m/40'/1'/0'/0`

//Criando o mnemonic paea seed (Palavras de senha)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network)

//Criando uma conta - par de pvt e pub keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAdress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network
}).address

console.log("Carteira gerada !")
console.log("Endereço:", btcAdress)
console.log("Chave privada", node.toWIF())
console.log("Seed", mnemonic)


