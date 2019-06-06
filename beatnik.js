import {pipe,ppipe,list} from './es_liszt.js'

const id = (a) => a

export const series = pipe(id)

export const parallel = ppipe(id)

export const one_off = (fn) => () => (a) => fn(a)

export const legba = () => {
  const actions = {}
  return ({
    sub: (act) => (fn) => (actions[act])
      ? Object.assign(actions,{[act]: actions[act](fn())})
      : Object.assign(actions,{[act]: parallel(fn())}),
    pub: (act) => (data) => actions[act] && actions[act]()(data)
  })
}

export const init = ($,act=null) =>
      ({get:() => $,
        set:($$,or) => (or) ? or()($=$$) : (act) ? act()($=$$) : $=$$})

export const init_o = ($,act=null) =>
      ({get:()=> $,
        set:($$,or) => (or) 
        ? or()(Object.assign($,$$)) 
        : (act) 
          ? act()(Object.assign($,$$)) 
          : Object.assign($,$$)})

export const append = (host) => (comp) => host.append(comp) || host

export const put = (comp) => (host) => host.append(comp) || host

export const empty = (cont) => (!cont.firstChild)
  ? cont
  : cont.removeChild(cont.firstChild) && empty(cont)

export const replace = (host) => (now) => (next) =>
  host.replaceChild(next,now) && host
