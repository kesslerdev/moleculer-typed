import { Service as MService, ServiceBroker, ServiceSettingSchema } from 'moleculer';

export class MoleculerService<S = ServiceSettingSchema> extends MService<S> {
  constructor(broker: ServiceBroker) {
    super(broker);

    // @ts-ignore
    const schema = this.constructor.__schema;

    if (this.created) {
      schema.created = this.created
    }
    if (this.started) {
      schema.started = this.started
    }
    if (this.stopped) {
      schema.stopped = this.stopped
    }

    this.parseServiceSchema(schema)
  }
}
