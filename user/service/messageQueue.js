import RabbitMQ from "./rabbit.js";

const rabbit = new RabbitMQ();

export async function initRabbit() {
  rabbit.setUrl(process.env.RABBIT_MQ_URL);
  await rabbit.connect();
}


export default rabbit;