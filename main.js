import {works,vids,links} from './works_list.js'
import {slideshow,video,link_list} from './views.js'
import {series,append,empty,legba} from './beatnik.js'
import {disco} from './disco.js'

const acts = legba()

const cont = document.getElementById('container')

const phone = () => window.matchMedia("(max-width:450px)").matches

const update = (next) => series(() => cont.className = 'fade-in')(() => append(empty(cont))(next))()

acts.sub('arts')(update(slideshow(works())))
acts.sub('vids')(update(video(vids())))
acts.sub('links')(update(link_list(links())))
acts.sub('p5')(series
               (() => cont.className = 'fade-in')
               (()=>empty(cont))
               (()=> {new p5((phone()) ? disco(300) : disco(500),cont)})())

document.getElementById('vid-link').addEventListener('click',acts.pub('vids'))
document.getElementById('art-link').addEventListener('click',acts.pub('arts'))
document.getElementById('link-link').addEventListener('click',acts.pub('links'))
document.getElementById('processing').addEventListener('click',acts.pub('p5'))

