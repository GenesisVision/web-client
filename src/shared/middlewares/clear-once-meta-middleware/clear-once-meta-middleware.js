const clearOnceMetaMiddleware = () => ({ dispatch }) => next => action => {
  if (action.meta && action.meta.once) {
    for (let prop of action.meta.once) {
      delete action.meta[prop];
    }
  }

  return next(action);
};

export default clearOnceMetaMiddleware;
