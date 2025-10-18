# Imagem base
FROM node:18

# Diretório de trabalho
WORKDIR /usr/src/app

# Copia somente os manifests primeiro (melhora cache)
COPY package*.json ./

# Instala dependências de produção (sem exigir package-lock)
RUN npm install --omit=dev

# Copia o restante do código
COPY . .

# Porta padrão do Cloud Run
ENV PORT=8080
EXPOSE 8080

# Comando de inicialização
CMD ["node", "server.js"]
