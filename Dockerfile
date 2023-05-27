FROM node

WORKDIR /usr/src/app

COPY . .

RUN npm install

ENV DATABASE_URL='mysql://jtwkcaw978rlbog9d2pq:pscale_pw_XqcCmcMKCfmZc0AgrGGw2MCpJEIAE1saDEsOvDZX1Cz@aws.connect.psdb.cloud/feedback-wizard?sslaccept=strict'
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_ZW5qb3llZC13b2xmLTg2LmNsZXJrLmFjY291bnRzLmRldiQ"
ENV CLERK_SECRET_KEY="sk_test_EnYdSPPD0ZNHuG98d6FdWBO6MeKc5CaVR9UrLv8m47"

EXPOSE 3000

CMD [ "npm","run","dev" ]