import React from "react";
import CollectionOverview from "../../components/collections-overview/collections-overview.component";
import { Route } from "react-router-dom";
import CollectionPage from "../collection/collection.component";

const ShopPage = ({ match }) => {
  //So we saw that object match exist there and through that
  //match object we hav access to match.path
  //console.log(match);
  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}// this gives /shop
        component={CollectionOverview} 
      />
      <Route 
        path={`${match.path}/:collectionId`}//e.g. /shop/hats 
        component={CollectionPage}
      />
    </div>
  );
};

export default ShopPage;
