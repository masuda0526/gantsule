# ベースイメージ
FROM node:20-slim

# タイムゾーン設定（日本時間）
ENV TZ=Asia/Tokyo

# 作業ディレクトリ
WORKDIR /usr/src/app

# 依存関係をコピーしてインストール
# COPY package*.json ./
# RUN npm ci

# ソースコードをコピー
COPY . .

# ポート公開（Vite用）
EXPOSE 5173

# 開発サーバー起動
CMD ["npm", "run", "dev"]
