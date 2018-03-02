import prodStore from './configureStore.prod';
import devStore from './configureStore.dev';

if (process.env.NODE_ENV === 'production') {
  module.exports = prodStore;
} else {
  module.exports = devStore;
}
