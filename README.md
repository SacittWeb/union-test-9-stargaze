# union-test-9-stargaze
stargaze ağındaki stars coinleri union ağına IBC köprüsü aracılığı ile transfer eder


sistemi güncel hale getirelim

sudo apt update && sudo apt upgrade -y

gerekli bağımlılıkları yükleyelim

npm install @cosmjs/proto-signing @cosmjs/stargate readline

dosya oluşturalım

mkdir bridge-stars-to-union-ibc.js


cd bridge-stars-to-union-ibc.js

nano bridge-stars-to-union-ibc.js
 ile dosya içine girip gerekli düzenlemeleri ( minemonic ler ve union adresiniz ) yapalım

 node bridge-stars-to-union-ibc.js

ile scripti başlatalım
