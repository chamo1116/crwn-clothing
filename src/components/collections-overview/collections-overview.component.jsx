import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollectionForPreview } from '../../redux/shop/shop.selector';


import { CollectionsOverviewContainer } from './collections-overview.styles';

import CollectionPreview from '../collection-preview/collection-preview.component';

const CollectionsOverview = ({ collections }) => (
    <CollectionsOverviewContainer>
        {
            collections.map(({ id, ...otherCollectionProps }) => (
                <CollectionPreview key={id} {...otherCollectionProps}></CollectionPreview>
            ))
        }

    </CollectionsOverviewContainer>
);

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionForPreview
});

export default connect(mapStateToProps)(CollectionsOverview);