import { useSliceAction, useSliceState } from '../../../shared/hooks/useStore';
import { IAlbumsActions, IAlbumsInitialState } from '../sliceStore/albumsSlice';

export const useAlbumsSlice = () => {
  const deletedItems = useSliceState<IAlbumsInitialState, 'deletedItems'>('deletedItems');

  const deleteItem = useSliceAction<IAlbumsActions, 'deleteItem'>('deleteItem');

  const createdItems = useSliceState<IAlbumsInitialState, 'createdItems'>('createdItems');

  const createItem = useSliceAction<IAlbumsActions, 'createItem'>('createItem');

  return {
    deletedItems,
    deleteItemLocally: deleteItem,
    createdItems,
    createItemLocally: createItem,
  };
};
