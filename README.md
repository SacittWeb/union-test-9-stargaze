# union-test-9-stargaze
stargaze ağındaki stars coinleri union ağına IBC köprüsü aracılığı ile transfer eder


sistemi güncel hale getirelim

sudo apt update && sudo apt upgrade -y

gerekli bağımlılıkları yükleyelim

npm install @cosmjs/proto-signing @cosmjs/stargate readline

git clone https://github.com/SacittWeb/union-test-9-stargaze.git

cd bridge-stars-to-union-ibc.js

nano bridge-stars-to-union-ibc.js
 ile dosya içine girip gerekli düzenlemeleri ( minemonic ler ve union adresiniz ) yapalım

 node bridge-stars-to-union-ibc.js

ile scripti başlatalım

minimum stars miktarı 3 stars olmalı

otomatik olarak 500 transfer yapar

hata oluşursa script oto olarak durdurulur.

