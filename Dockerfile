#Bajamos la imagen oficial
FROM node:14.16.0-alpine    

#Establecemos directorio de trabajo
WORKDIR /app

#Añadimos /app/node_modules/.bin al $PATH
ENV PATH /app/node_modules/.bin:$PATH

#Instalamos las dependencias
COPY package.json ./
COPY package-lock.json ./
RUN npm install 
RUN npm install -g react-create-app 


#Add app
COPY . ./

#Comenzar app
CMD ["npm","start"]