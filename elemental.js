export const container = (id) => {
  const cont = document.createElement('div')
  cont.id = id
  return cont
}

export const lor_ip = (className) => {
  const block = document.createElement('div')
  block.className = className
  return block
}

export const link = (text,href) => {
  const a = document.createElement('a')
  a.textContent = text
  a.href = href
  return a
}

export const pic_box = (url) => {
  const base = document.createElement('div')
  base.className = 'pic-box'
  base.style.backgroundImage = `url(${url})`
  const overlay = document.createElement('div')
  overlay.style.height = '100%'
  overlay.style.width = '100%'
  overlay.style.opacity = '0'
  base.append(overlay)
  return base
}

export const add_class = (cname) => (el) => {
  el.className = cname
  return el
}

export const text_box = (content) => {
  const tb = document.createElement('text')
  tb.textContent = content
  return tb
}
