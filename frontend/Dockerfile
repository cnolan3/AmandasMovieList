FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i

COPY --chown=app:app . /app

EXPOSE 5173

CMD ["npm", "run", "dev"]
