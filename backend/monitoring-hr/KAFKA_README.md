# Kafka Consumer Implementation

This service now includes a Kafka consumer that listens to the `monitoring-change` topic.

## Configuration

Add the following environment variables to your `.env` file:

```env
# Kafka Configuration
KAFKA_CLIENT_ID=monitoring-hr-consumer
KAFKA_BROKERS=localhost:9092
KAFKA_GROUP_ID=monitoring-hr-group
```

## How it works

1. The `KafkaConsumerService` automatically connects to Kafka when the service starts
2. It subscribes to the `monitoring-change` topic
3. When a message is received, the `handleMonitoringChange` method processes it
4. The service logs all received messages and any processing errors

## Message Processing

The consumer currently:
- Logs received messages
- Returns a success response
- Handles errors gracefully

You can extend the `handleMonitoringChange` method to add your specific business logic for processing monitoring changes.

## Dependencies

The following packages were added:
- `@nestjs/microservices` - NestJS microservices support
- `kafkajs` - Kafka client for Node.js

## Files Created

- `src/kafka/kafka.module.ts` - Kafka module configuration
- `src/kafka/consumer.service.ts` - Consumer service implementation
- `src/kafka/index.ts` - Module exports
