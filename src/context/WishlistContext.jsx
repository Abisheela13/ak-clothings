import React, { createContext, useContext, useState } from 'react'

const WishlistContext = createContext()

export function WishlistProvider({children}){
  const [items, setItems] = useState([])

  function addToWishlist(product){
    setItems(prev=> prev.find(p=>p.id===product.id)?prev:[...prev, product])
  }

  function removeFromWishlist(id){
    setItems(prev=>prev.filter(p=>p.id!==id))
  }

  return (
    <WishlistContext.Provider value={{items, addToWishlist, removeFromWishlist}}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist(){ return useContext(WishlistContext) }
