import mt from 'moleculer-typed';

import { ServiceSettingSchema, Context } from 'moleculer';

interface Settings extends ServiceSettingSchema {
  d: string;
}

@mt.Service({
  name: "api2.service",
})
class ApiService extends mt.MoleculerService<Settings> {
  test = "salut"

  @mt.Action({
    cache: true,
  })
  public hello(@mt.Param({ ddd: false }) test: string, @mt.Param({ name: "ctx" }) ctx: Context) {
    console.log("hello", this.test)
    return { res: true }
  }

  @mt.BeforeActionHook("hello")
  public beforeHello() {
    console.log("before hello", this.test)
  }

  @mt.BeforeActionHook("hello")
  public beforeHello2() {
    console.log("before hello2", this.test)
  }

  @mt.AfterActionHook("hello")
  public afterHello() {
    console.log("after hello", this.test)
  }

  @mt.AfterActionHook("hello")
  public afterHello2() {
    console.log("after hello2", this.test)
    throw new Error('ddd');
  }

  @mt.ErrorHook()
  public async err(ctx: Context, err: Error) {
    console.log("Errrorr!", this.test)

    return { err }
  }

  @mt.Event()
  public async evt() {
    console.log("event");
  }
}

export default ApiService
