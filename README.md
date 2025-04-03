# union-test-9-stargaze
stargaze ağındaki stars coinleri union ağına IBC köprüsü aracılığı ile transfer eder


sistemi güncel hale getirelim

sudo apt update && sudo apt upgrade -y

gerekli bağımlılıkları yükleyelim

npm install @cosmjs/proto-signing @cosmjs/stargate readline

git clone https://github.com/SacittWeb/union-test-9-stargaze.git

cd union-test-9-stargaze

nano bridge-stars-to-union-ibc.js

 ile dosya içine girip gerekli düzenlemeleri ( minemonic ler ve union adresiniz ) yapalım

 node bridge-stars-to-union-ibc.js

ile scripti başlatalım

minimum stars miktarı 3 stars olmalı

otomatik olarak 500 transfer yapar

hata oluşursa script oto olarak durdurulur.

Sorumluluk reddi
⚠️ Sadece Eğitim Amaçlı

Bu betik yalnızca Union Testnet'te eğitim ve test amaçlı olarak sağlanmaktadır
Tüm işlemler gerçek parasal değeri olmayan testnet varlıklarını kullanır
Union veya herhangi bir blockchain kuruluşuyla bağlantılı veya onaylı değildir
Açık veya örtük HİÇBİR GARANTİ YOK - kendi riskinizle kullanın
Geliştiriciler şunlardan dolayı hiçbir sorumluluk kabul etmez:
Herhangi bir mali kayıp
Hesap yasakları
Ağ kesintileri
Kötüye kullanımın hukuki sonuçları
Ana ağ kullanımı kesinlikle önerilmez ve ağ politikalarını ihlal edebilir
Kullanıcılar, yerel düzenlemelere uymaktan münhasıran sorumludur

