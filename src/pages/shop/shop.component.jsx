import React from "react";
import CollectionOverview from "../../components/collections-overview/collections-overview.component";
import { Route } from "react-router-dom";
import CollectionPage from "../collection/collection.component";
import { connect } from "react-redux";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { fetchCollectionsStartAsync as unboundImportedFetchFollectionStartAsync} from '../../redux/shop/shop.actions';
import {selectIsCollectionFetching, selectIsCollectionsLoaded} from '../../redux/shop/shop.selectors';
import {createStructuredSelector} from 'reselect';


const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {

  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();//We call this function to fetch collections asynchronously after the component ShopPage mounting completes.
  }

  render() {
    const { match, isCollectionFetching, isCollectionsLoaded } = this.props;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`} // this gives /shop
          render={(props) => (
            <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`} //e.g. /shop/hats
          render={(props) => (
            <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector(
  {
    isCollectionFetching: selectIsCollectionFetching, //Possiblev values are true or false i.e. collections are fetched or not
    isCollectionsLoaded: selectIsCollectionsLoaded
  }
);

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(unboundImportedFetchFollectionStartAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
