import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const swaggerDocument = YAML.load("./docs/swagger.yaml");

export function setupSwagger(app: any) {
    app.use(
        "/api/docs",
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocument)
    );
}