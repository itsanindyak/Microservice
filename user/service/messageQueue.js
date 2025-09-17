import RabbitMQ from "./rabbit.js";
let instance;

export function getRabbit() {
  if (!instance) instance = new RabbitMQ();
  return instance;
}

export async function initRabbit() {
  const rabbit = new RabbitMQ();
  rabbit.setUrl(process.env.RABBIT_MQ_URL);
  await rabbit.connect();
}
