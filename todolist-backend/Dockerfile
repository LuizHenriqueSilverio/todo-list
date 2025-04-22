# Etapa de build
FROM node:20-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências (com devDependencies para compilar)
RUN npm install

# Copia o restante da aplicação
COPY . .

# Compila o código TypeScript
RUN npm run build

# Etapa de produção
FROM node:20-alpine

WORKDIR /app

# Copia apenas o necessário da imagem de build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Exponha a porta usada pelo NestJS
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["node", "dist/main"]
