import {
  MoleculerService,
  Service,
  Action, BeforeActionHook, AfterActionHook, ErrorHook,
  Event,
  Param
} from 'moleculer-typed';

import {
  Action as ct,
} from 'moleculer-typed';

import { ServiceSettingSchema, Context } from 'moleculer';

interface Settings extends ServiceSettingSchema {
  d: string;
}

@Service({
  name: "api.service",
})
class ApiService extends MoleculerService<Settings> {
  test = "salut"

  @Action({
    cache: true,
  })
  public hello(@Param({ ddd: false }) test: string, @Param({ name: "ctx" }) ctx: Context) {
    console.log("hello", this.test)
    return { res: true }
  }

  @BeforeActionHook("hello")
  public beforeHello() {
    console.log("before hello", this.test)
  }

  @BeforeActionHook("hello")
  public beforeHello2() {
    console.log("before hello2", this.test)
  }

  @AfterActionHook("hello")
  public afterHello() {
    console.log("after hello", this.test)
  }

  @AfterActionHook("hello")
  public afterHello2() {
    console.log("after hello2", this.test)
    throw new Error('ddd');
  }

  @ErrorHook()
  public async err(ctx: Context, err: Error) {
    console.log("Errrorr!", this.test)

    return { err }
  }

  @Event()
  public async evt() {
    console.log("event");
  }
}

export default ApiService
