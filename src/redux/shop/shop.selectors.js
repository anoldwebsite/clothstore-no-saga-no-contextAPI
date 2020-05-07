import { createSelector } from 'reselect';

const selectShop = state => state.shop;//Get shop from state.
//Get collections from shop
export const selectCollections = createSelector(
    [selectShop],
    (shop) => shop.collections
);
export const selectCollection = collectionUrlParam => createSelector(
    [selectCollections],//this gives us collections
    (collections) => collections[collectionUrlParam]
);//selectCollection returns a function

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => Object.keys(collections).map(key => collections[key])
);