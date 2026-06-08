const makeProduct = (id, category, title, price, color, image) => ({
  id: String(id),
  category,
  title,
  price,
  color,
  image,
  rating: (Math.random()*1.5+3.5).toFixed(1),
  description: `Elegant ${title} from AKS Clothings, crafted with premium fabrics.`
})

// import all product image assets and categorize by filename patterns
const modules = import.meta.glob('../assets/products/*.{svg,jpg,jpeg,png}', { eager: true })
const entries = Object.keys(modules).sort().map(k => ({ path: k, url: modules[k].default }))

// helper patterns
const dressPattern = /dress|gown|sari|lehenga|dress-/i
const accPattern = /(^|\W)(acc-|acc|accessory|chain|hair|band|headband|earring|necklace|watch|bag|purse|bracelet|clip|clips|belt|ring)(\W|$)/i

const isRaster = (p) => /\.(jpe?g|png)$/i.test(p)
const sortPreferRaster = (arr) => arr.sort((a,b)=> (isRaster(b.path)?1:0) - (isRaster(a.path)?1:0))

// prefer raster images (jpg/png) for real product photos
const rasterEntries = entries.filter(e => /\.(jpe?g|png)$/i.test(e.path))
const svgEntries = entries.filter(e => /\.svg$/i.test(e.path))

const dressRaster = rasterEntries.filter(e => dressPattern.test(e.path)).map(e=>e.url)
const accRaster = rasterEntries.filter(e => accPattern.test(e.path)).map(e=>e.url)

const dressSvg = svgEntries.filter(e => dressPattern.test(e.path)).map(e=>e.url)
const accSvg = svgEntries.filter(e => accPattern.test(e.path)).map(e=>e.url)

// build final image lists preferring raster, then svg, then any remaining rasters
const dressImgs = dressRaster.length ? dressRaster.slice() : (dressSvg.length ? dressSvg.slice() : rasterEntries.map(e=>e.url))
const accImgs = accRaster.length ? accRaster.slice() : (accSvg.length ? accSvg.slice() : rasterEntries.map(e=>e.url))

// any leftover rasters not already used: distribute them
const used = new Set([...dressImgs, ...accImgs])
const leftover = rasterEntries.map(e=>e.url).filter(u=> !used.has(u))
leftover.forEach((url, idx)=> { if(idx%2===0) dressImgs.push(url); else accImgs.push(url) })

// ensure we have at least one image to avoid empty arrays
if(dressImgs.length === 0) dressImgs.push('/src/assets/avatar-placeholder.svg')
if(accImgs.length === 0) accImgs.push('/src/assets/avatar-placeholder.svg')

const dresses = Array.from({length:20}).map((_,i)=>
  makeProduct(i+1,'Dresses', `Elegant Dress ${i+1}`, 39 + i*5, ['#F7D6DA','#E9E6F7','#F6EFEB'][i%3], dressImgs[i % dressImgs.length])
)

const accessories = Array.from({length:20}).map((_,i)=>
  makeProduct(100+i+1,'Accessories', `Accessory ${i+1}`, 9 + i*3, ['#F7D6DA','#E9E6F7','#F6EFEB'][i%3], accImgs[i % accImgs.length])
)

// Remove unwanted products here by id (e.g., remove Accessory 1 with id '101')
export const products = [...dresses, ...accessories].filter(p => p.id !== '101')

export default products
