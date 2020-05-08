import React from "react";
import CollectionOverview from "../../components/collections-overview/collections-overview.component";
import { Route } from "react-router-dom";
import CollectionPage from "../collection/collection.component";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";
import { updateCollections as unboundImportedupdateCollections } from "../../redux/shop/shop.actions";
import {connect} from 'react-redux';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  constructor(){
    super();
    this.state = {
      laoding: true
    }
  }
  //Get data from Firebase
  unsubscribeFromSnapshot = null;
  componentDidMount() {
   const {updateCollections} = this.props;//Detructuring

    const collectionRef = firestore.collection("collections");
    collectionRef.onSnapshot(async (snapshot) => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({laoding: false})
    });
  }
  render() {
    const { match } = this.props;
    const { laoding } = this.state;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`} // this gives /shop
          render= { props => (
            <CollectionsOverviewWithSpinner isLoading={laoding} {...props} />
          ) }
        />
        <Route
          path={`${match.path}/:collectionId`} //e.g. /shop/hats
          render= { props => (
            <CollectionPageWithSpinner isLoading={laoding} {...props} />
          )}
        />
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(unboundImportedupdateCollections(collectionsMap)),
});
export default connect(null, mapDispatchToProps)(ShopPage);
