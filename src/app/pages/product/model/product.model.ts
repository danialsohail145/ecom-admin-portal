export interface Product{
    collectionId: string,
    id:string,
    name:string,
    code: string,
    price: string,
    description: Description,
    size: string[],
    availablePiece?:Pieces[],
    availablePieces:Pieces[],
    productDetail: string[],
    sizeGuide: SizeGuide,
    images: string[],
    isOnSale:boolean,
    isProductSold: boolean,
    salePrice: string
}

export interface Description{
    main: string,
    top: string
}
export interface Pieces{
    piece: string,
    price: string
}
export interface SizeGuide{
    top: string,
    bottom: string
}