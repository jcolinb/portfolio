import {first,rest,map} from './es_liszt.js'
import {init,parallel,append,series,put} from './beatnik.js'
import {lor_ip,link,container} from './elemental.js'

export const link_list = (ls) => {
  const block = lor_ip('link-list')
  map(({left,right})=> append(block)(link(left,right)))(ls)
  return block
}

export const slideshow = (ls) => {

  const state = init(ls)

  const slideshow = container('slideshow')
  const canvas = container('canvas')
  const info = container('info')

  const newPic = (host) => (ls) => {
    host.className = 'fade-out'
    setTimeout(() =>
               (host.style.backgroundImage = `url(${first(ls).right})`) &&  (host.className = 'fade-in'),500)
  }

  const newInfo = (host) => (ls) => {
    host.className = 'fade-out'
    setTimeout(() => 
               (host.textContent = `${first(ls).left}`) &&  (host.className = 'fade-in'),500)    
  }

  const render = parallel(newPic(canvas))(newInfo(info))

  const update = () => (rest(state.get()))
        ? state.set(rest(state.get()),render)
        : state.set(ls,render)

  canvas.addEventListener('click',update)
  state.set(ls,render)
  return series(put(canvas))(put(info))()(slideshow)
}

export const video = (ls) => {
  const outer = container('slideshow')
  const player = document.createElement('video')
  player.controls = true
  player.src = first(ls).right
  const info = container('info')
  info.textContent = first(ls).left
  return series(put(player))(put(info))()(outer)
}

