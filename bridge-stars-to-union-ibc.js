import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import pkg from "@cosmjs/stargate";
const { SigningStargateClient } = pkg;
import fs from "fs";

// Sabit yapılandırma (güvenlik için mnemonic'i bir .env dosyasına taşıyabilirsiniz)
const config = {
    mnemonic: "buraya-kendi-mnemonic-inizi-ekleyin", // Kendi mnemonic'inizi buraya ekleyin
    recipient: "union1...", // Union Testnet adresinizi buraya ekleyin
    amount: "0.001", // Her işlemde transfer edilecek STARS miktarı (örneğin, 0.001 STARS)
    transactionCount: 500 // Toplam işlem sayısı
};

const STARGAZE_RPC = "https://rpc.elgafar-1.stargaze-apis.com/";
const STARGAZE_DENOM = "ustars";
const IBC_CHANNEL = "channel-1"; // Stargaze -> Union IBC kanalı
const GAS_LIMIT = 200000; // Dinamik gaz limiti 

async function starsToUnionKopru() {
    // Config'den girişleri al
    const { mnemonic, recipient, amount, transactionCount } = config;

    // Alıcı adres kontrolü
    if (!recipient.startsWith("union")) {
        console.error("⚠️ Hata: Hedef adres 'union' ile başlamalıdır!");
        process.exit(1);
    }

    // Stargaze cüzdanı oluşturma
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: "stars" });
    const [account] = await wallet.getAccounts();
    console.log("Gönderici Adresi (Stargaze):", account.address);

    // Stargaze RPC'ye bağlanma
    const client = await SigningStargateClient.connectWithSigner(STARGAZE_RPC, wallet);

    // Bakiye kontrolü
    const balance = await client.getBalance(account.address, STARGAZE_DENOM);
    console.log(`Cüzdan Bakiyesi: ${balance.amount / 1e6} STARS`);
    const totalCost = parseFloat(amount) * 1e6 * transactionCount + 5000 * transactionCount; // Transfer + ücretler
    if (parseInt(balance.amount) < totalCost) {
        console.error("⚠️ Yetersiz bakiye! Gerekli:", totalCost / 1e6, "STARS");
        process.exit(1);
    }

    const toplamIslem = parseInt(transactionCount, 10);

    for (let i = 1; i <= toplamIslem; i++) {
        console.log(`🔄 İşlem ${i}/${toplamIslem} gönderiliyor...`);

        const gonderilecekMiktar = {
            denom: STARGAZE_DENOM,
            amount: (parseFloat(amount) * 1e6).toFixed(0), // STARS -> uSTARS
        };

        const ucret = {
            amount: [{ denom: STARGAZE_DENOM, amount: "5000" }], // 5000 uSTARS ücret
            gas: GAS_LIMIT.toString(),
        };

        const zamanAsimi = (Date.now() + 5 * 60 * 1000) * 1_000_000; // 5 dakika zaman aşımı

        const mesaj = {
            typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
            value: {
                sourcePort: "transfer",
                sourceChannel: IBC_CHANNEL,
                token: gonderilecekMiktar,
                sender: account.address,
                receiver: recipient,
                timeoutTimestamp: zamanAsimi,
            },
        };

        try {
            const sonuc = await client.signAndBroadcast(account.address, [mesaj], ucret);
            console.log(`✅ İşlem ${i} başarılı! Hash: ${sonuc.transactionHash}`);
            fs.appendFileSync("islemler.log", `İşlem ${i}: ${sonuc.transactionHash}\n`);
        } catch (error) {
            console.error(`❌ İşlem ${i} başarısız, script durduruluyor:`, error.message);
            process.exit(1); // Hata olduğunda script durur
        }

        await new Promise(resolve => setTimeout(resolve, 5000));
    }

    console.log("🎉 Tüm işlemler tamamlandı!");
}

starsToUnionKopru().catch(error => {
    console.error("❌ Script çalıştırılırken bir hata oluştu:", error.message);
    process.exit(1);
});
