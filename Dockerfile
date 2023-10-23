# Depuis node
FROM node as builder
#set la workdir
WORKDIR /app
#copie du package.json et package-lock.json dans le container
COPY package*.json ./

#installations de typescript et @types/node, puis init de l'index.ts
RUN npm install --production

RUN npm install typescript --save-dev
RUN npm install @types/node --save-dev
RUN npx tsc --init --rootDir src --outDir build --esModuleInterop --resolveJsonModule --lib es6 --module commonjs --allowJs true --noImplicitAny true

#copy du dossier src dans container
COPY src ./src

#run du .ts
RUN npx tsc

#2e stage
FROM node

WORKDIR /app

COPY --from=builder /app/build/index.js /app

COPY package*.json ./

RUN npm install --production

#fin du docker
CMD node build/index.js

# à entrer dans terminal 'docker build -t test-node .'