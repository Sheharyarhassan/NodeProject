const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

const options = {
   definition: {
      openapi: "3.0.0",
      info: {
         title: "Book API",
         version: "1.0.0",
         description: "API documentation for the Book project",
      },
      servers: [
         {
            url: `${process.env.API_URI}api`, // Adjust based on your setup
         },
      ],
      components: {
         securitySchemes: {
            BearerAuth: {
               type: "http",
               scheme: "bearer",
               bearerFormat: "JWT",
            },
         },
      },
   },
   apis: [path.join(__dirname, "../Routes/*.js")], // Path to your route files
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
   app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
   console.log(`${process.env.API_URI}swagger`);
};

module.exports = swaggerDocs;
