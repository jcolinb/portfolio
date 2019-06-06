export const first = ({$}) => $

export const rest = ({$$}) => $$

export const cons = ($) => ($$=null) => ({$,$$})

export const pair = (left) => (right=null) => ({left,right})

export const left = ({left}) => left

export const right = ({right}) => right

export const map = (fn) => (ls) =>
      ls && cons(fn(first(ls)))(map(fn)(rest(ls)))

export const filter = (p) => (ls) =>
  ls 
  && ((p(first(ls))) 
        ? cons(first(ls))(filter(p)(rest(ls)))
        : filter(p)(rest(ls)))

export const reduce = (fn,a) => (ls) =>
      (!ls || a === undefined)
        ? a || null
        : reduce(fn,fn(a,first(ls)))(rest(ls))

export const length = reduce((a,c) => a+1,0)

export const last = (ls) => !rest(ls) && ls || last(rest(ls))

export const reverse = reduce((a,c) => cons(c)(a),null)

export const append = (l) => (r) => reduce((a,c) => cons(c)(a),r)(reverse(l))

export const list = (a) => (b=null) =>
      (!b) 
        ? (a.$)
          ? a
          : cons(a)(null)
        : list(append((a.$) ? a : cons(a)(null))(cons(b)(null)))

export const pipe = (a) => (fn=null) =>
      (!fn)
        ? (x) => reduce((a,c)=>c(a),x)(a)
        : pipe((!first(a)) ? append(cons(a)(null))(cons(fn)(null)) : append(a)(cons(fn)(null)))

export const ppipe = (a) => (fn=null) => 
      (!fn) 
        ? (x) => map((f)=>f(x))(a) 
        : ppipe((!first(a)) ? append(cons(a)(null))(cons(fn)(null)) : append(a)(cons(fn)(null)))

export const pluck = (prop) => pipe(filter(({left})=> left === prop))(map(({right})=> right))(first)()

export const dig = map((a) => a())

export const inspect = reduce((a,c) => a+' '+`${c}`,'LIS(Z)T ')

export const snitch = (tag) => (ls) => 
      ls 
      || console.log(`${tag}: I got nothin\'`) 
      ||  null

