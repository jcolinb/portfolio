import {first,rest,map} from './es_liszt.js'
import {init,parallel,append,series,put,empty} from './beatnik.js'
import {lor_ip,link,container,pic_box,text_box,add_class} from './elemental.js'

export const link_list = (ls) => {
  const block = lor_ip('link-list')
  map(({left,right})=> append(block)(link(left,right)))(ls)
  return block
}

export const slideshow = (ls) => {

  const state = init(ls)
  const slideshow = container('slideshow')
  const newFrame = (ls) => 
          series
           (add_class('fade-out'))
           ((host) => setTimeout(() => 
                                 series
                                  (empty)
                                  (put(pic_box(first(ls).right)))
                                  (put(append(lor_ip('info'))(text_box(first(ls).left))))
                                  (add_class('fade-in'))()(host),500))()(slideshow)
   
  const render = series(newFrame)

  const update = () => (rest(state.get()))
        ? state.set(rest(state.get()),render)
        : state.set(ls,render)

  slideshow.addEventListener('click',update)
  state.set(ls,render)
  return slideshow
}

export const video = (ls) => {
  const outer = container('slideshow')
  const player = document.createElement('video')
  player.controls = true
  player.src = first(ls).right
  return series
  (put(player))
  (put(append(lor_ip('info'))(text_box(first(ls).left))))
  ()(outer)
}

