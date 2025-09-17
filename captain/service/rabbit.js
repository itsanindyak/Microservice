import amqp from "amqplib";

export default class RabbitMQ {
  constructor() {
    this.url = null;
    this.connection = null;
    this.channel = null;
  }

  setUrl(url) {
    if (!url) throw new Error("RabbitMQ URL is required");
    this.url = url;
  }

  async connect() {
    try {
      console.log("Connecting to RabbitMQ...");
      this.connection = await amqp.connect(this.url);
      this.channel = await this.connection.createChannel();
      console.log("✅ RabbitMQ connected & channel created");

      // Handle unexpected close
      this.connection.on("close", () => {
        console.error("❌ RabbitMQ connection closed");
      });

      this.connection.on("error", (err) => {
        console.error("❌ RabbitMQ error:", err.message);
      });
    } catch (error) {
      console.error("❌ Failed to connect to RabbitMQ:", error.message);
      throw error;
    }
  }

  async publish(queue, message) {
    if (!this.channel) throw new Error("Channel is not initialized");
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, Buffer.from(message));
    console.log(`📤 Message sent to [${queue}]: ${message}`);
  }

  async subscribe(queue, callback) {
    if (!this.channel) throw new Error("Channel is not initialized");
    await this.channel.assertQueue(queue, { durable: true });

    this.channel.consume(queue, (msg) => {
      if (msg !== null) {
        try {
          const content = JSON.parse(msg.content.toString());
          callback(content);
          this.channel.ack(msg);
        } catch (err) {
          console.error("Failed to process message:", err);
          this.channel.nack(msg, false, false);
        }
      }
    });
    console.log(`📥 Subscribed to queue [${queue}]`);
  }

  async close() {
    await this.channel?.close();
    await this.connection?.close();
    console.log("🔌 RabbitMQ connection closed");
  }
}



