FROM node:22.2.0

WORKDIR /workspace

COPY package*.json ./
RUN npm install --only=production

RUN chown -R node:node /workspace
USER node

COPY --chown=node:node . .

EXPOSE 3001
EXPOSE 3002

CMD ["npm", "run", "dev"] 